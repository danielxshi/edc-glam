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
          className="product-details-subcontent-header mb-6 text-xxs leading-relaxed  w-4/5 ml-0 mr-auto"
          html={product.descriptionHtml}
        />
      ) : null}
    </>
  );
}
