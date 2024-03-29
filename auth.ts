import NextAuth, { DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { db } from "./lib/db";
import { getUserByEmail, getUserById } from "./data/user";
import { UserRole } from "@prisma/client";

type ExtendedUser = DefaultSession["user"] & { role: UserRole };

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

// these exported functions can be used in any component or server action
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  /**
   * Events are async functions that do not return a response,
   * they are useful for audit logs/reporting or handling any other side-effects.
   */
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  /**
   * These callbacks will be triggered in the middleware.
   * They can used to do validation no matter user login with API or server action.
   * The server action /actions/login.ts can only execute validation for logging in via web form.
   */
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        if (user?.email) {
          const existUser = await getUserByEmail(user.email);
          if (existUser) {
            return true;
          }
        }
      } catch (error) {
        console.error(error);
      }
      /**
       * Doing email verification side check here.
       */
      return true;
    },
    // @ts-ignore
    async session({ session, token }) {
      if (session.user) {
        if (token.sub) {
          session.user.id = token.sub;
        }
        if (token.role) {
          session.user.role = token.role as UserRole;
        }
      }
      return session;
    },
    async jwt({ token, account, profile }) {
      /**
       * All customized properties in this token can be used in middleware auth function
       * where we can verify user role against different routes. It's role based action control in middleware
       */
      if (token.sub) {
        const user = await getUserById(token.sub);
        token.role = user?.role;
      }

      return token;
    },
  },
});
