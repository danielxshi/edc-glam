import { NextResponse } from "next/server";

// Force Node runtime so process.env is available
export const runtime = "nodejs";

export async function POST(req: Request) {
  // Read and trim both the input and the env var
  const body = await req.json().catch(() => ({}));
  const input = String(body?.password ?? "").trim();
  const env = String(process.env.SITE_PASSWORD ?? "").trim();

  // Helpful errors while debugging (comment these out later)
  console.log("[/api/password] hasEnv?", Boolean(env), "inputLen:", input.length);

  if (!env) {
    // If env isn't loaded, tell yourself explicitly
    return NextResponse.json({ ok: false, reason: "SITE_PASSWORD not set" }, { status: 500 });
  }

  if (input && input === env) {
    const res = NextResponse.json({ ok: true });
    res.cookies.set("site_authed", "1", {
      path: "/",
      httpOnly: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    return res;
  }

  return NextResponse.json({ ok: false, reason: "bad password" }, { status: 401 });
}

// (Optional) Temporary GET for sanity check — delete after it works
export async function GET() {
  return NextResponse.json({ hasPassword: Boolean((process.env.SITE_PASSWORD ?? "").trim()) });
}
