import { z } from "zod";

export const RegisterSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.email().min(1, "Email is required"),
    username: z.string().min(1, "Username is required"),
    phone_number: z.string().min(1, "Phone Number is required"),
    password: z.string().min(1, "Password is required"),
    re_password: z.string().min(1, "Re-Password is required"),
  })
  .refine((data) => data.password === data.re_password, {
    message: "Password does not match",
    path: ["re_password"],
  });
