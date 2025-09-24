// app/api/auth/logout/route.ts
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

function clearToken(res: NextResponse) {
  // On localhost, `secure: false` is required; in prod, `secure: true`
  res.cookies.set('sf_customer_token', '', {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0, // delete
  })
}

// POST for programmatic logout (fetch)
export async function POST(req: NextRequest) {
  const res = NextResponse.json({ ok: true, redirect: '/' })
  clearToken(res)
  return res
}

// GET for link-based logout fallbacks (direct navigation)
export async function GET(req: NextRequest) {
  const url = new URL('/', req.url)
  const res = NextResponse.redirect(url)
  clearToken(res)
  return res
}
