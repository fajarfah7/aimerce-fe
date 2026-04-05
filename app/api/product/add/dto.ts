import { z } from "zod";
import { ProcessProductSchema } from "@/app/account/product/add/schema";

export type AddProductRequest = z.infer<typeof ProcessProductSchema>;

export type AddProductResponse = {
  message: string;
  data: null;
  http_status: number;
};
