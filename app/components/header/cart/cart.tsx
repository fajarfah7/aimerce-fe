import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";

type CartButtonProps = {
  totalCart: number;
};

export function CartButton({ totalCart }: CartButtonProps) {
  return (
    <div>
      <Badge variant={"secondary"} className="w-full h-full">
        <ShoppingCart />
        {totalCart}+
      </Badge>
    </div>
  );
}
