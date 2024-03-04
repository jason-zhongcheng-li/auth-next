import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "./routes";

/**
 * The Middleware is used to protect any single routes of the application
 * whatever it is public path or private path.
 *
 * We could exclude some of the public paths like landing page, documentation.
 */
export const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  // req.auth
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isDefaultRoute = DEFAULT_LOGIN_REDIRECT === nextUrl.pathname;

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      // pass nextUrl as 2nd parameter to make an absolute url
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  // returning null means do nothing, make the request happen
  return null;
});

/**
 * Optionally, don't invoke Middleware on some paths
 * Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
 */
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
