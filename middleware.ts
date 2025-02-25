import { auth } from "@/auth";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  if (pathname === "/") {
    const url = new URL("/Q&A", req.nextUrl.origin);
    return Response.redirect(url);
  }
  if (
    pathname === "/signin" ||
    pathname === "/signup" ||
    pathname === "/questions" ||
    /^\/questions\/\d+$/.test(pathname)
  ) {
    return;
  }
  if (
    !req.auth &&
    (/^\/questions\/\d+\/edit$/.test(pathname) ||
      /^\/questions\/\d+\/delete$/.test(pathname))
  ) {
    const url = new URL("/Q&A/signin", req.nextUrl.origin);
    return Response.redirect(url);
  }
  if ((!req.auth || !req.auth?.user?.is_admin) && pathname.endsWith("admin")) {
    const url = new URL("/Q&A/signin", req.nextUrl.origin);
    return Response.redirect(url);
  }
});
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
