import { NextRequest, NextResponse } from "next/server";

const COOKIE = "site_authed";

// Optional kill switch: set DISABLE_SITE_PASSWORD=1 to force-disable
const DISABLE = process.env.DISABLE_SITE_PASSWORD === "1";

// Only protect in production, when SITE_PASSWORD is set, and not disabled
const PROTECT =
  Boolean(process.env.SITE_PASSWORD) &&
  process.env.NODE_ENV === "production" &&
  !DISABLE;

export function middleware(req: NextRequest) {
  if (!PROTECT) return NextResponse.next();

  const { pathname } = req.nextUrl;

  // allowlisted paths
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

// ❗ MUST be a static object (no conditionals/vars)
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
