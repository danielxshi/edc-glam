import { NextResponse } from "next/server";
// (Optional: also call MUT_LOGOUT to revoke; cookie clearing is enough for UI)

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set("sf_customer_token", "", { path: "/", maxAge: 0 });
  return res;
}
