import { z } from "zod";

const AdditionalInformationItem = z.object({
  name: z.string().trim().min(1, "name is required").max(100, "max name is 100 chars"),
  value: z.string().trim().min(1, "value is required").max(255, "max value is 255 chars"),
});

export const ProcessProductSchema = z.object({
  category_code: z.string().trim().min(1, "category_code is required"),
  sku: z.string().trim().min(1, "sku is required").max(255, "max sku is 255 chars"),
  name: z.string().trim().min(1, "name is required").max(255, "max name is 255 chars"),
  image: z.string().trim().optional().or(z.literal("")),
  description: z
    .string()
    .trim()
    .min(1, "description is required")
    .max(500, "max description is 500 chars"),
  additional_information: z.array(AdditionalInformationItem).max(20).optional(),
  uom: z.string().trim().min(1, "uom is required").max(50, "max uom is 50 chars"),
  quantity: z.number().int().min(0, "quantity must be >= 0"),
  price: z
    .string()
    .trim()
    .regex(/^\d{1,10}(\.\d{1,2})?$/, "price must be decimal(12,2)")
    .refine((val) => Number(val) > 0, "price must be greater than 0"),
  expired_at: z.iso.datetime({ offset: true }).optional().or(z.literal("")),
});
