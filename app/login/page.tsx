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
import { LoginSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { ApiResponse } from "@/app/api/api";
import { Login } from "@/app/api/login/login";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const loginHandler = async (data: z.infer<typeof LoginSchema>) => {
    const res: ApiResponse<null> = await Login(data);
    if (!res.ok) {
      alert(res.message);
      return;
    }
    router.replace("/dashboard");
  };

  return (
    <>
      <Card className="md:min-w-md min-w-80">
        <CardHeader>
          <CardTitle>Login to AImerce</CardTitle>
          <CardDescription>Enter username and password.</CardDescription>
          <CardAction>
            <Button variant={"default"} asChild>
              <Link href={"/register"}>Register</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form id="login" onSubmit={form.handleSubmit(loginHandler)}>
            <FieldGroup>
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
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" form="login">
            Login
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
