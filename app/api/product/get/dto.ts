import { PaginationResponse } from "../../api";

export type ProductCardPagination = {
  message: string;
  http_status: number;
  data: ProductCard[];
  pagination_meta: PaginationResponse;
};

export type ProductCard = {
  slug: string;
  name: string;
  description: string;
  store_slug: string;
  store_name: string;
  image: string;
  price: string;
  quantity_available: number;
  expired_at: Date | null;
};
