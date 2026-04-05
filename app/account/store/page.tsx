"use client";

import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { CreateStoreSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ApiResponse } from "@/app/api/api";
import { CreateStore } from "@/app/api/store/store";

export default function StorePage() {
  const form = useForm<z.infer<typeof CreateStoreSchema>>({
    resolver: zodResolver(CreateStoreSchema),
    defaultValues: {
      slug: "",
      name: "",
      email: "",
      phone_number: "",
      address: "",
      description: "",
    },
  });

  const handleCreate = async (data: z.infer<typeof CreateStoreSchema>) => {
    const res: ApiResponse<null> = await CreateStore(data);
    if (!res.ok) {
      alert(res.message);
      return;
    }
    alert("success create store");
    // const res: ApiResponse<null> = await
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-6">Store</h2>
      <form
        className="space-y-4 max-w-md"
        id="create-store"
        onSubmit={form.handleSubmit(handleCreate)}
      >
        <div>
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
                  placeholder="Store Name"
                  type="text"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          {/* <label className="block text-sm mb-1">Name</label>
          <input type="text" className="w-full border rounded px-3 py-2" /> */}
        </div>
        <div>
          <Controller
            name="slug"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="slug">Slug</FieldLabel>
                <Input
                  {...field}
                  id="slug"
                  aria-invalid={fieldState.invalid}
                  placeholder="Slug"
                  type="text"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </div>
        <div>
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
                  placeholder="Email Address"
                  type="email"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </div>
        <div>
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
        <div>
          <Controller
            name="address"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="address">Address</FieldLabel>
                <Textarea
                  {...field}
                  id="address"
                  aria-invalid={fieldState.invalid}
                  placeholder="Address"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </div>
        <div>
          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <Textarea
                  {...field}
                  id="description"
                  aria-invalid={fieldState.invalid}
                  placeholder="Description"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </div>
        <button className="bg-black text-white px-4 py-2 rounded">Save</button>
      </form>
    </>
  );
}
