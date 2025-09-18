// src/app/api/auth/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.redirect(new URL("/", process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"));
  // Clear the customer token cookie
  res.cookies.set("sf_customer_token", "", { path: "/", httpOnly: true, secure: true, maxAge: 0 });
  return res;
}
