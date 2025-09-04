import { NextRequest, NextResponse } from "next/server";

const PROTECT = true;                 // flip to false to disable
const PASSWORD = process.env.SITE_PASSWORD || "letmein";
const COOKIE = "site_authed";

export function middleware(req: NextRequest) {
  if (!PROTECT) return NextResponse.next();

  // allow static assets, api routes, and the password page itself
  const { pathname } = req.nextUrl;
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/password")
  ) {
    return NextResponse.next();
  }

  // already authed?
  const authed = req.cookies.get(COOKIE)?.value === "1";
  if (authed) return NextResponse.next();

  // no auth → redirect to password page
  const url = req.nextUrl.clone();
  url.pathname = "/password";
  url.searchParams.set("next", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
