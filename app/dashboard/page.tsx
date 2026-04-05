"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "../components/product/card/card";
import { GetProductCards } from "../api/product/get/get-products";
import { ProductCard as Product } from "../api/product/get/dto";

export default function DashboardPage() {
  const query: string = "page=1&per_page=10&search=";
  const [data, setData] = useState<Product[] | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetProductCards(query);
        if (!result.ok) {
          alert(result.message);
          return;
        }
        if (result.data?.data) {
          setData(result.data?.data);
        }
      } catch (e: unknown) {
        alert(e);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="w-full">
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
