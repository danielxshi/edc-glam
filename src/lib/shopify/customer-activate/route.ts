import { NextResponse } from "next/server";
import { shopifyFetch } from "@/lib/shopify/shopify-storefront";

const MUTATION = /* GraphQL */ `
  mutation customerActivate($id: ID!, $input: CustomerActivateInput!) {
    customerActivate(id: $id, input: $input) {
      customer { id email }
      customerAccessToken { accessToken expiresAt }
      customerUserErrors { field message code }
    }
  }
`;

export async function POST(req: Request) {
  const { id, activationToken, password } = await req.json();
  const data = await shopifyFetch(MUTATION, {
    id,
    input: { activationToken, password },
  }) as {
    customerActivate: {
      customer: { id: string; email: string };
      customerAccessToken: { accessToken: string; expiresAt: string };
      customerUserErrors: { field: string[]; message: string; code: string }[];
    };
  };

  const res = data.customerActivate;
  if (res.customerUserErrors?.length) {
    return NextResponse.json({ errors: res.customerUserErrors }, { status: 400 });
  }

  // set cookie for session if you want
  return NextResponse.json({
    customer: res.customer,
    token: res.customerAccessToken,
  });
}
