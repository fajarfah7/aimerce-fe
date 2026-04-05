export type ProductDetail = {
  message: string;
  http_status: number;
  data: Product;
};

type AdditionalInformation = {
  name: string;
  value: string;
};

export type Product = {
  id: string; // UUID
  store_id: string; // UUID (FK)
  category_id: string;
  slug: string; // varchar(255)
  sku: string; // varchar(255)
  name: string; // varchar(255)
  image: string;
  description: string; // text
  additional_information: AdditionalInformation[] | null; // jsonb nullable
  uom: string; // varchar(20)
  // Decimal(12,2) → use string (avoid JS float precision bug)
  price: string;
  expired_at: Date | null; // timestamptz
  status: string; // varchar(30)
  quantity_available: number; // integer
  created_at: Date;
  updated_at: Date;
};
