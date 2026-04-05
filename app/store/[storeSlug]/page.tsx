import { GetProductCards } from "@/app/api/product/get/get-products";
import { ProductCard } from "@/app/components/product/card/card";

type StorePageProps = {
  params: Promise<{ storeSlug: string }>;
};

export default async function StorePage({ params }: StorePageProps) {
  const { storeSlug } = await params;

  const query: string = "page=1&per_page=10&search=";
  const result = await GetProductCards(query);
  if (!result.ok) return <div>Something went wrong</div>;

  const data = result.data?.data;

  return (
    <div className="w-full">
      <div className="mb-10">Welcome to {storeSlug}</div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {data &&
          data.map((d, idx) => (
            <div key={idx}>
              <ProductCard
                name={d.name}
                description={d.description}
                price={d.price}
                image={d.image}
                storeSlug={d.store_slug}
                productSlug={d.slug}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
