// ...same imports as before
const ALLOWED = ["firstName","lastName","company","address1","address2","city","province","zip","country","phone"];
const sanitize = (a:any) => Object.fromEntries(ALLOWED.flatMap(k => a?.[k]!=null && a[k]!=="" ? [[k, a[k]]] : []));

export async function POST(req: Request) {
  const token = (await cookies()).get("sf_customer_token")?.value;
  if (!token) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const addr = await req.json();
  const address = sanitize(addr);

  const r = await shopifyFetch({
    query: MUT_CUSTOMER_ADDRESS_CREATE,
    variables: { accessToken: token, address },
    cache: "no-store",
  });

  const errs = r?.body?.data?.customerAddressCreate?.customerUserErrors;
  if (errs?.length) return NextResponse.json({ error: errs[0].message, errs }, { status: 400 });

  return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}
