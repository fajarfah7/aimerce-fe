import { ScrollArea } from "@/components/ui/scroll-area";
import { ProductCard } from "@/app/components/product/card/card";
import { ProductCard as Product } from "@/app/api/product/get/dto";

type OtherProductProps = {
  storeSlug: string;
  products: Product[];
};

export function OtherProducts({ storeSlug, products }: OtherProductProps) {
  console.log("products ==>", products);
  return (
    <ScrollArea className="flex flex-col h-74 md:h-115 rounded-2xl w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4 h-full p-3">
        <ProductCard
          name={"Test 1"}
          description={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          }
          price={"18.000.000,00"}
          image={
            "https://www.milwaukeetool.id/media/catalog/product/cache/aae45e24d488221c804b88faf4867efb/m/1/m18fid2-0-hero01.png"
          }
          storeSlug={`${storeSlug}`}
          productSlug={"some-product-slug-here"}
        />
        <ProductCard
          name={"Test 1"}
          description={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          }
          price={"18.000.000,00"}
          image={
            "https://www.milwaukeetool.id/media/catalog/product/cache/aae45e24d488221c804b88faf4867efb/m/1/m18fid2-0-hero01.png"
          }
          storeSlug={`${storeSlug}`}
          productSlug={"some-product-slug-here"}
        />
        <ProductCard
          name={"Test 1"}
          description={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          }
          price={"18.000.000,00"}
          image={
            "https://www.milwaukeetool.id/media/catalog/product/cache/aae45e24d488221c804b88faf4867efb/m/1/m18fid2-0-hero01.png"
          }
          storeSlug={`${storeSlug}`}
          productSlug={"some-product-slug-here"}
        />
        <ProductCard
          name={"Test 1"}
          description={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          }
          price={"18.000.000,00"}
          image={
            "https://www.milwaukeetool.id/media/catalog/product/cache/aae45e24d488221c804b88faf4867efb/m/1/m18fid2-0-hero01.png"
          }
          storeSlug={`${storeSlug}`}
          productSlug={"some-product-slug-here"}
        />
      </div>
    </ScrollArea>
  );
}
