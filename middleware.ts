import { NextRequest, NextResponse } from "next/server";

const COOKIE = "site_authed";

// Set DISABLE_SITE_PASSWORD=1 to force-disable protection
const DISABLE = process.env.DISABLE_SITE_PASSWORD === "1";

// Only protect when there's a password, we're in prod, and not disabled
const PROTECT =
  Boolean(process.env.SITE_PASSWORD) &&
  process.env.NODE_ENV === "production" &&
  !DISABLE;

export function middleware(req: NextRequest) {
  if (!PROTECT) return NextResponse.next();

  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    pathname === "/password" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname === "/manifest.json"
  ) {
    return NextResponse.next();
  }

  if (req.cookies.get(COOKIE)?.value === "1") return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = "/password";
  url.searchParams.set("next", pathname);
  return NextResponse.redirect(url);
}

// Only match when protection is actually on
export const config = {
  matcher: PROTECT ? ["/((?!_next/static|_next/image|favicon.ico).*)"] : [],
};
