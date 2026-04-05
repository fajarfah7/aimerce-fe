"use client";

import { Product } from "@/app/api/product/detail/dto";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

type ProductProps = {
  product: Product;
};

export function ProductDetail({ product }: ProductProps) {
  return (
    <div className="flex flex-col md:flex-row md:justify-between gap-4 items-center">
      {product && (
        <div>
          <Card className="w-80 md:h-115">
            <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden">
              <div className="absolute inset-0 z-30 dark:bg-gray-800/35" />
              <Badge
                className="absolute top-2 right-2 z-30 px-3 py-1 text-xs shadow-md"
                variant="secondary"
              >
                Available
              </Badge>
              <Image
                src={product.image}
                alt="Product Image"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="flex flex-col gap-4">
                <p>{product.description}</p>
                <div>
                  <ul className="list-disc p-3 flex flex-col gap-2">
                    {product.additional_information &&
                      product.additional_information.map((item, idx) => (
                        <li key={idx}>
                          {item.name}: {item.value}
                        </li>
                      ))}
                  </ul>
                </div>
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Button className="bg-orange-300">Chat</Button>
              <Button className="bg-blue-300">Add to cart</Button>
              <Button variant={"default"}>Buy</Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}
