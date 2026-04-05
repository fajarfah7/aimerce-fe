import { z } from "zod";

export const CreateStoreSchema = z.object({
  slug: z.string().min(1, "slug is required"),
  name: z.string().min(1, "name is required"),
  email: z.string().min(1, "email is required"),
  phone_number: z.string().min(1, "phone number is required"),
  address: z.string().min(1, "address is required"),
  description: z.string().min(1, "description is required"),
});
