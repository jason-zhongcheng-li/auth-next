import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { db } from "./lib/db";
import { getUserById } from "./data/user";

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
   * These callbacks will be triggered in the middleware.
   * They can used to do validation no matter user login with API or server action.
   * The server action /actions/login.ts can only execute validation for logging in via web form.
   */
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    // @ts-ignore
    async session({ session, token }) {
      console.log("session token =", token);
      return session;
    },
    async jwt({ token, account, profile }) {
      // const user = await getUserById(token.sub);
      return token;
    },
  },
});
