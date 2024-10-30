import { auth } from "@/auth";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  // Bypass the middleware for specific routes
  if (
    pathname === "/signin" ||
    pathname === "/signup" ||
    pathname === "/questions" ||
    /^\/questions\/\d+$/.test(pathname) // Matches /questions/[id]
  ) {
    return;
  }
  if (
    !req.auth &&
    (/^\/questions\/\d+\/edit$/.test(pathname) ||
      /^\/questions\/\d+\/delete$/.test(pathname))
  ) {
    const url = new URL("/signin", req.nextUrl.origin);
    return Response.redirect(url);
  }
});
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
