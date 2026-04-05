import { ProductDetail } from "@/app/components/product/detail/detail";
import { GetProductDetail } from "@/app/api/product/detail/detail";
import { GetProductCards } from "@/app/api/product/get/get-products";
import { ChatProduct } from "@/app/components/product/chat-product/chat-product";
import { OtherProducts } from "@/app/components/product/other-product/other-product";

type StoreProductProps = {
  params: Promise<{
    storeSlug: string;
    productSlug: string;
  }>;
};

export default async function StoreProductPage({ params }: StoreProductProps) {
  const { storeSlug, productSlug } = await params;

  const data = await GetProductDetail(storeSlug, productSlug);
  if (!data.ok) return <div>{data.message}</div>;
  if (!data.data?.data) return <div>Product not found</div>;
  const product = data.data.data;

  const query: string = `except_product_slug=${productSlug}&page=1&per_page=10&search=`;
  const result = await GetProductCards(query);
  if (!result.ok) return <div>{data.message}</div>;
  const products = result.data?.data;

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center">
      <ProductDetail product={product} />
      <ChatProduct product={product} />
      {products && <OtherProducts storeSlug={storeSlug} products={products} />}
    </div>
  );
}
