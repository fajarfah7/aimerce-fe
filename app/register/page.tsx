"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { RegisterSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Register } from "@/app/api/register/register";
import { ApiResponse } from "@/app/api/api";
import { RegisterResponse } from "@/app/api/register/dto";

export default function RegisterPage() {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      username: "",
      phone_number: "",
      password: "",
      re_password: "",
    },
  });

  const registerHandler = async (data: z.infer<typeof RegisterSchema>) => {
    const res: ApiResponse<RegisterResponse | null> = await Register(data);
    if (!res.ok) {
      alert(res.message);
    }
    alert(res.message);
  };
  return (
    <>
      <Card className="md:min-w-md min-w-80">
        <CardHeader>
          <CardTitle>Register New Account</CardTitle>
          <CardDescription>Register to AImerce get best offer.</CardDescription>
          <CardAction>
            <Button variant={"default"} asChild>
              <Link href={"/login"}>Login</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form id="register" onSubmit={form.handleSubmit(registerHandler)}>
            <FieldGroup>
              <div className="flex flex-col gap-4">
                <div className="grid gap-2">
                  <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="name">Name</FieldLabel>
                        <Input
                          {...field}
                          id="name"
                          aria-invalid={fieldState.invalid}
                          placeholder="Name"
                          type="text"
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input
                          {...field}
                          id="email"
                          aria-invalid={fieldState.invalid}
                          placeholder="Email"
                          type="email"
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <Controller
                    name="username"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="username">Username</FieldLabel>
                        <Input
                          {...field}
                          id="username"
                          aria-invalid={fieldState.invalid}
                          placeholder="Username"
                          type="text"
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <Controller
                    name="phone_number"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="phone_number">Phone Number</FieldLabel>
                        <Input
                          {...field}
                          id="phone_number"
                          aria-invalid={fieldState.invalid}
                          placeholder="Phone Number"
                          type="text"
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <Input
                          {...field}
                          id="password"
                          aria-invalid={fieldState.invalid}
                          placeholder="Password"
                          type="password"
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <Controller
                    name="re_password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor="re_password">Re-Password</FieldLabel>
                        <Input
                          {...field}
                          id="re_password"
                          aria-invalid={fieldState.invalid}
                          placeholder="Re-Password"
                          type="password"
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />
                </div>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" form="register">
            Register
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
