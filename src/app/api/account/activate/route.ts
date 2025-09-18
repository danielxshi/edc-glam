// src/app/api/account/activate/route.ts
import { NextResponse } from "next/server";
import { activateCustomer } from "@/lib/shopify";

export async function POST(req: Request) {
  try {
    const { id, token, password } = await req.json();
    if (!id || !token || !password) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }
    const result = await activateCustomer({ id, token, password });
    return NextResponse.json({ ok: true, result });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || "Activation error" }, { status: 400 });
  }
}
