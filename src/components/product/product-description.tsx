// components/product/product-description.tsx
import Link from "next/link";
import { Product } from "../../lib/shopify/types";
import Price from "../price";
import VariantSelector from "./variant-selector";
import Prose from "../prose";
import { AddToCart } from "../cart/add-to-cart";

export function ProductDescription({
  product,
  children,
}: {
  product: Product;
  children?: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-col">
        <h1 className="mb-2 uppercase text-xl font-medium">{product.title}</h1>
        <div className="mr-auto w-auto text-sm">
          <Price
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </div>
      </div>

      <VariantSelector options={product.options} variants={product.variants} />

      {children}

      <div className="product-details-subcontent-header">
        <AddToCart product={product} />
      </div>

      {product.descriptionHtml ? (
        <Prose
          className="product-details-subcontent-header mb-6 text-xxs leading-relaxed w-4/5 ml-0 mr-auto"
          html={product.descriptionHtml}
        />
      ) : null}

      {/* NEW: Sizing / Shipping / Tutorials accordion */}
      <ProductInfoAccordion
        className="mt-6 w-4/5 ml-0 mr-auto"
        shippingHref="/policies/shipping-policy"
        faqHref="/pages/faq"
        tutorialsHref="/pages/tutorials"
        baseToTip="~26mm"
        modelSize="S"
      />
    </>
  );
}

/* ---------------------------------------------
   ProductInfoAccordion
   - Accessible <details>/<summary> accordion
   - Tailwind-only, no external deps
---------------------------------------------- */
function ProductInfoAccordion({
  className = "",
  shippingHref = "/policies/shipping-policy",
  faqHref = "/pages/faq",
  tutorialsHref = "/pages/tutorials",
  modelSize = "S",
  baseToTip = "~26mm",
}: {
  className?: string;
  shippingHref?: string;
  faqHref?: string;
  tutorialsHref?: string;
  modelSize?: string;
  baseToTip?: string;
}) {
  return (
    <div className={className}>
      <InfoSection title="SIZING" defaultOpen>
        <div className="space-y-4 text-xxs leading-relaxed tracking-wide text-zinc-800">
          <p className="uppercase">Model is wearing size {modelSize}</p>
          <p className="uppercase">Base to tip length: {baseToTip}</p>
          <p className="uppercase">
            Please correctly measure your size before placing an order. Due to
            hygiene reasons, we do not accept refunds if you select the
            incorrect size.
          </p>
        </div>
      </InfoSection>

      <InfoSection title="SHIPPING & DELIVERY" defaultOpen>
        <div className="space-y-4 text-xxs leading-relaxed tracking-wide text-zinc-800">
          <p className="uppercase font-semibold">International</p>
          <ul className="space-y-2">
            <li className="uppercase">
              <span className="font-semibold">Standard:</span> 9 USD or equivalent
              (free over 100 USD or equivalent) — 6–27 business days
            </li>
            <li className="uppercase">
              <span className="font-semibold">DHL Express:</span> 19 USD or equivalent
              (free over 200 USD or equivalent) — 3–5 business days
            </li>
          </ul>
          <p className="uppercase">
            Note that the price is <span className="font-semibold">not</span>{" "}
            inclusive of import duties &amp; taxes. Buyers are responsible for
            any additional fees that may occur at customs.
          </p>
          <p className="uppercase">
            More shipping options and information{" "}
            <UnderlineLink href={shippingHref}>here</UnderlineLink>.
          </p>
        </div>
      </InfoSection>

      <InfoSection title="TUTORIALS & FAQ" defaultOpen>
        <div className="space-y-3 text-xxs leading-relaxed tracking-wide text-zinc-800">
          <p className="uppercase">
            For frequently asked questions please click{" "}
            <UnderlineLink href={faqHref}>here</UnderlineLink>.
          </p>
          <p className="uppercase">
            For our tutorials click{" "}
            <UnderlineLink href={tutorialsHref}>here</UnderlineLink>.
          </p>
        </div>
      </InfoSection>
    </div>
  );
}

/* ---------------------------------------------
   Reusable Section (accordion)
---------------------------------------------- */
function InfoSection({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details className="group border-t border-zinc-300 py-5" open={defaultOpen}>
      {/* remove default marker */}
      <summary className="flex cursor-pointer list-none items-center justify-between">
        <h4 className="text-xs uppercase tracking-widest text-zinc-800">{title}</h4>
        <PlusMinus className="h-4 w-4 text-zinc-700 group-open:[&_.vert]:opacity-0" />
      </summary>
      <div className="mt-4">{children}</div>
    </details>
  );
}

/* ---------------------------------------------
   UI bits
---------------------------------------------- */
function PlusMinus({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* vertical bar hidden when <details> is open via group-open selector above */}
      <path className="vert" d="M12 4v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function UnderlineLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="underline underline-offset-4 decoration-zinc-400 hover:decoration-zinc-800"
    >
      {children}
    </Link>
  );
}
