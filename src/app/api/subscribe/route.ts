import { NextResponse } from "next/server";

const API_VERSION = "2024-07";
const SHOP_DOMAIN = (process.env.SHOPIFY_SHOP || process.env.SHOPIFY_STORE_DOMAIN || "")
  .replace(/^https?:\/\//, "")
  .replace(/\/$/, "");
const ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN;

const ADMIN_URL = `https://${SHOP_DOMAIN}/admin/api/${API_VERSION}/graphql.json`;

async function shopify<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const r = await fetch(ADMIN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": ADMIN_TOKEN as string,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await r.json();
  if (!r.ok) throw new Error(`Shopify HTTP ${r.status}`);
  if (json.errors?.length) throw new Error(json.errors[0]?.message || "GraphQL error");
  return json.data as T;
}

const FIND_CUSTOMER = /* GraphQL */ `
  query FindCustomer($query: String!) {
    customers(first: 1, query: $query) {
      edges { node { id email } }
    }
  }
`;

const CREATE_CUSTOMER = /* GraphQL */ `
  mutation CreateCustomer($input: CustomerInput!) {
    customerCreate(input: $input) {
      customer { id email }
      userErrors { field message }
    }
  }
`;

const UPDATE_CONSENT = /* GraphQL */ `
  mutation UpdateConsent($input: CustomerEmailMarketingConsentUpdateInput!) {
    customerEmailMarketingConsentUpdate(input: $input) {
      customer {
        id
        email
        emailMarketingConsent {
          marketingState
          marketingOptInLevel
          consentUpdatedAt
        }
      }
      userErrors { field message }
    }
  }
`;

export async function POST(req: Request) {
  try {
    if (!SHOP_DOMAIN || !ADMIN_TOKEN) {
      return NextResponse.json(
        { ok: false, error: "Missing SHOPIFY_SHOP or SHOPIFY_ADMIN_API_ACCESS_TOKEN" },
        { status: 500 }
      );
    }

    const { email } = await req.json();
    if (!email || typeof email !== "string") {
      return NextResponse.json({ ok: false, error: "Email required" }, { status: 400 });
    }

    // 1) find existing customer by email
    const find = await shopify<{ customers: { edges: { node: { id: string } }[] } }>(
      FIND_CUSTOMER,
      { query: `email:${JSON.stringify(email)}` } // proper quoting
    );
    let customerId = find.customers.edges[0]?.node.id;

    // 2) create if missing (minimal customer)
    if (!customerId) {
      const create = await shopify<{ customerCreate: { customer?: { id: string }, userErrors: { message: string }[] } }>(
        CREATE_CUSTOMER,
        {
          input: {
            email,
            // you can set names if you want: firstName, lastName, etc.
          },
        }
      );
      const ce = create.customerCreate;
      if (ce.userErrors?.length) {
        return NextResponse.json({ ok: false, error: ce.userErrors[0].message }, { status: 400 });
      }
      customerId = ce.customer!.id;
    }

    // 3) update email marketing consent
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      undefined;

    const update = await shopify<{
      customerEmailMarketingConsentUpdate: {
        customer?: { emailMarketingConsent?: { marketingState: string } };
        userErrors: { message: string }[];
      };
    }>(UPDATE_CONSENT, {
      input: {
        customerId,
        emailMarketingConsent: {
          marketingState: "SUBSCRIBED",         // or "PENDING"
          marketingOptInLevel: "SINGLE_OPT_IN", // or "CONFIRMED_OPT_IN" (double opt-in)
          consentUpdatedAt: new Date().toISOString(),
          consentCollectedFromIp: ip,
        },
      },
    });

    const ue = update.customerEmailMarketingConsentUpdate.userErrors?.[0];
    if (ue) return NextResponse.json({ ok: false, error: ue.message }, { status: 400 });

    const state =
      update.customerEmailMarketingConsentUpdate.customer?.emailMarketingConsent?.marketingState;

    return NextResponse.json({ ok: true, state });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Failed" }, { status: 500 });
  }
}
