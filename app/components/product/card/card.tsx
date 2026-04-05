import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  name: string;
  description: string;
  price: string;
  image: string;
  storeSlug: string;
  productSlug: string;
};

export function ProductCard({
  name,
  description,
  price,
  image,
  storeSlug,
  productSlug,
}: ProductCardProps) {
  name = name.length + 3 > 40 ? name.slice(0, 37) + "..." : name;
  // if (name.length + 3 > 40) {
  //   name = name.slice(0, 37) + "...";
  // }
  description = description.length + 3 > 85 ? description.slice(0, 82) + "..." : description;
  // if (description.length + 3 > 85) {
  //   description = description.slice(0, 82) + "...";
  // }
  return (
    <Card className="flex h-full flex-col relative mx-auto w-full max-w-sm pt-0">
      <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-30 dark:bg-gray-800/35" />
        <Badge
          className="absolute top-2 right-2 z-30 px-3 py-1 text-xs shadow-md"
          variant="secondary"
        >
          Available
        </Badge>
        <Image src={image} alt="Product Image" fill className="object-contain" unoptimized />
      </div>
      <CardHeader>
        <CardAction></CardAction>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto">
        <Button asChild className="w-full">
          <Link href={`/store/${storeSlug}/product/${productSlug}`}>Rp. {price}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
