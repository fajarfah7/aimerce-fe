"use client";

import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { ProcessProductSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { UploadFile } from "@/app/api/upload-file/upload-file";
import { AddProduct } from "@/app/api/product/add/add-product";

export default function ProductAddPage() {
  const form = useForm<z.infer<typeof ProcessProductSchema>>({
    resolver: zodResolver(ProcessProductSchema),
    defaultValues: {
      category_code: "ELECTRONIC",
      sku: "",
      name: "",
      image: "",
      description: "",
      additional_information: [],
      uom: "",
      quantity: 0,
      price: "0",
      expired_at: "",
    },
  });

  console.log(form.formState.errors);

  const [file, setFile] = useState<File | null>(null);
  const handleUploadFile = async (): Promise<string | undefined> => {
    if (!file) {
      alert("please choose file");
      return;
    }

    const fd = new FormData();
    fd.append("file", file);

    const res = await UploadFile(fd);
    if (!res.ok) {
      alert(res.message);
      return;
    }
    if (res.data?.data.key === undefined) {
      alert("something went wrong");
      return;
    }
    return res.data?.data.key;
  };

  const handleAdd = async (data: z.infer<typeof ProcessProductSchema>) => {
    const res = await AddProduct(data);
    if (!res.ok) {
      alert(res.message);
      return;
    }

    alert("success");
    return;
  };

  const {
    fields: fieldsInf,
    append: appendInf,
    remove: removeInf,
  } = useFieldArray({
    control: form.control,
    name: "additional_information",
  });
  return (
    <>
      <h2>Add Product</h2>
      <form id="add-product" onSubmit={form.handleSubmit(handleAdd)} className="space-y-4 max-w-md">
        <div>
          <Controller
            name="sku"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="sku">SKU</FieldLabel>
                <Input
                  {...field}
                  id="sku"
                  aria-invalid={fieldState.invalid}
                  placeholder="SKU"
                  type="text"
                />
              </Field>
            )}
          />
        </div>
        <div>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="name">Product Name/Title</FieldLabel>
                <Input
                  {...field}
                  id="name"
                  aria-invalid={fieldState.invalid}
                  placeholder="Product Name/Title"
                  type="text"
                />
              </Field>
            )}
          />
        </div>
        <div>
          <Controller
            name="image"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="image">Image</FieldLabel>
                <Input
                  {...field}
                  id="image"
                  aria-invalid={fieldState.invalid}
                  placeholder="Product Image"
                  type="text"
                />
              </Field>
            )}
          />
        </div>
        <div>
          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState}>
                <FieldLabel htmlFor="description">Product Description</FieldLabel>
                <Textarea
                  {...field}
                  id="description"
                  aria-invalid={fieldState.invalid}
                  placeholder="Product Description"
                />
              </Field>
            )}
          />
        </div>
        <div>
          <div>
            <Field>
              <FieldLabel htmlFor="image">Image</FieldLabel>
              <Input
                id="image"
                onChange={(e) => {
                  setFile(e.target.files?.[0] || null);
                }}
                type="file"
              />
            </Field>
          </div>
          <div>
            <Controller
              name="image"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="image">Image</FieldLabel>
                  <Input
                    {...field}
                    id="image"
                    aria-invalid={fieldState.invalid}
                    onClick={async (e) => {
                      e.preventDefault();
                      const res = await handleUploadFile();
                      field.onChange(res ?? "");
                    }}
                    type="button"
                    value={"Upload"}
                  />
                </Field>
              )}
            />
          </div>
        </div>
        <div>
          <Button type="button" onClick={() => appendInf({ name: "", value: "" })}>
            Add Information
          </Button>
          {fieldsInf.map((field, i) => (
            <div
              key={field.id}
              className="flex md:flex-row flex-col gap-2 m-2 border-2 p-2 rounded-md"
            >
              <Controller
                control={form.control}
                name={`additional_information.${i}.name`}
                render={({ field }) => (
                  <Field>
                    <FieldLabel htmlFor={`inf-name-${i}`}>Name</FieldLabel>
                    <Input {...field} id={`inf-name-${i}`} type="text" placeholder="Ex: Color" />
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name={`additional_information.${i}.value`}
                render={({ field }) => (
                  <Field>
                    <FieldLabel htmlFor={`inf-value-${i}`}>Value</FieldLabel>
                    <Input {...field} id={`inf-value-${i}`} type="text" placeholder="EX: Blue" />
                  </Field>
                )}
              />
              <div className="flex md:flex-row flex-col items-end">
                <Button variant={"destructive"} type="button" onClick={() => removeInf(i)}>
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div>
          <Controller
            name="uom"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="uom">UOM</FieldLabel>
                <Input
                  {...field}
                  id="uom"
                  aria-invalid={fieldState.invalid}
                  placeholder="UOM"
                  type="text"
                />
              </Field>
            )}
          />
        </div>
        <div>
          <Controller
            name="quantity"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="quantity">Quantity</FieldLabel>
                <Input
                  {...field}
                  id="quantity"
                  aria-invalid={fieldState.invalid}
                  placeholder="Quantity"
                  type="number"
                  value={field.value ?? ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value === "" ? 0 : Number(value));
                  }}
                />
              </Field>
            )}
          />
        </div>
        <div>
          <Controller
            name="price"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="price">Price</FieldLabel>
                <Input
                  {...field}
                  id="price"
                  aria-invalid={fieldState.invalid}
                  placeholder="Price"
                  type="number"
                  value={field.value ?? ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value === "" ? "0" : value);
                  }}
                />
              </Field>
            )}
          />
        </div>
        <div>
          <Button type="submit">Add</Button>
        </div>
      </form>
    </>
  );
}
