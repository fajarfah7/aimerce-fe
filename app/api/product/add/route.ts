import { cookies } from "next/headers";
import { api, extractError } from "../../api";
import { ProcessProductSchema } from "@/app/account/product/add/schema";
import { AddProductResponse } from "./dto";

export async function POST(req: Request) {
  const payload = await req.json();

  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token)
    return Response.json(
      {
        ok: false,
        message: "missing token",
        httpStatus: 401,
        data: null,
        isContainErrorDetail: false,
      },
      { status: 401 },
    );

  const tokenValue = token.value;
  try {
    const res = await api.post<typeof ProcessProductSchema, AddProductResponse>(
      "/account/product/add",
      payload,
      undefined,
      tokenValue,
    );
    return Response.json(res, { status: res.http_status });
  } catch (e: unknown) {
    const error = extractError(e);
    return Response.json(
      {
        ok: false,
        message: error.message,
        httpStatus: error.httpStatus,
        data: null,
        isContainErrorDetail: false,
      },
      { status: error.httpStatus },
    );
  }
}
