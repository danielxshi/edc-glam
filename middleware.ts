// middleware.ts
import { NextRequest, NextResponse } from "next/server";

const COOKIE = "site_authed";
// ⬇️ force OFF
const PROTECT = false;

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

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
