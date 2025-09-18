import { activateCustomer } from "@/lib/shopify/customers";

export async function POST(req: Request) {
  try {
    const { id, token, password } = await req.json();
    if (!id || !token || !password) {
      return new Response("Missing fields", { status: 400 });
    }

    const result = await activateCustomer({ id, token, password });
    return Response.json({ ok: true, result });
  } catch (err: any) {
    console.error(err);
    return Response.json({ ok: false, error: err.message }, { status: 400 });
  }
}
