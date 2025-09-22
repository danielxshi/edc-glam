// lib/announcement.ts
import { shopifyFetch } from "@/lib/shopify";

type Announcement = {
  message: string;
  code?: string;
  startAt?: string;
  endAt?: string;
  bg?: string;
  fg?: string;
  autoApply?: boolean;
  ctaLabel?: string;
  ctaUrl?: string;
};

// Narrow response shape from Shopify GraphQL
type MetaobjectField = { key: string; value: string };
type GqlResponse = {
  body?: {
    data?: {
      metaobjects?: {
        edges?: Array<{
          node?: { fields?: MetaobjectField[] };
        }>;
      };
    };
  };
};

export async function getAnnouncement(): Promise<Announcement | null> {
  const QUERY = `
    query Announcement {
      metaobjects(
        type: "announcement"
        first: 1
        sortKey: "updated_at"
        reverse: true
      ) {
        edges {
          node { fields { key value } }
        }
      }
    }
  `;

  // Cast the response so TS knows the shape
  const res = (await shopifyFetch({
    query: QUERY,
    cache: "no-store",
  })) as GqlResponse;

  const fieldsArray = res.body?.data?.metaobjects?.edges?.[0]?.node?.fields ?? [];
  const fields = Object.fromEntries(
    fieldsArray.map((f) => [f.key, f.value])
  ) as Record<string, string>;

  // accept either `code`, `discount_code`, or `discountCode`
  const code =
    fields.code ?? fields.discount_code ?? (fields as any).discountCode ?? "";

  const start = fields.startAt ? new Date(fields.startAt) : null;
  const end = fields.endAt ? new Date(fields.endAt) : null;
  const now = new Date();

  const active =
    !!fields.message && (!start || now >= start) && (!end || now <= end);
  if (!active) return null;

  return {
    message: fields.message,
    code: code || undefined,
    startAt: fields.startAt,
    endAt: fields.endAt,
    bg: fields.bg,
    fg: fields.fg,
    autoApply: fields.autoApply === "true",
    ctaLabel: fields.ctaLabel,
    ctaUrl: fields.ctaUrl,
  };
}
