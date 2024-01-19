import { auth } from "./auth";

/*
  The Middleware is used to protect any single routes of the application
  whatever it is public path or private path.
  We could exclude some of the public paths like landing page, documentation.

*/

export default auth((req) => {
  // req.auth
  const isLoggedIn = !!req.auth;
  console.log("ROUTE: ", req.nextUrl.pathname, " is logged in? ", isLoggedIn);
});

// Optionally, don't invoke Middleware on some paths
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
