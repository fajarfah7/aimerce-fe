import { z } from "zod";

export const LoginSchema = z.object({
  username: z.string(),
  password: z.string().min(1, "password is empty"),
});
