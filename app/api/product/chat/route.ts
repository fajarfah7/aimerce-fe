import { cookies } from "next/headers";
import { api, extractError } from "../../api";
import env from "@/config/env.config";
import { ChatMessageRequest, GetChatMessageResponse } from "./dto";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token)
    return Response.json(
      {
        ok: false,
        message: "missing token",
        httpStatus: 403,
        data: null,
        isContainErrorDetail: false,
      },
      { status: 403 },
    );
  const tokenValue = token.value;

  const searchParams = req.nextUrl.searchParams;
  const storeSlug = searchParams.get("store_slug");
  if (!storeSlug)
    return Response.json(
      {
        ok: false,
        message: "missing store",
        httpStatus: 400,
        data: null,
        isContainErrorDetail: false,
      },
      { status: 400 },
    );

  const productSlug = searchParams.get("product_slug");
  if (!productSlug)
    return Response.json(
      {
        ok: false,
        message: "missing product",
        httpStatus: 400,
        data: null,
        isContainErrorDetail: false,
      },
      { status: 400 },
    );

  try {
    const res = await api.get<GetChatMessageResponse>(
      `/product/chat/${storeSlug}/${productSlug}`,
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

export async function POST(req: Request) {
  const payload = (await req.json()) as ChatMessageRequest;

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
  const bodyRequest: BodyInit = JSON.stringify({ message: payload.message });
  try {
    const response = await fetch(
      `${env.API_URL}/product/chat/${payload.storeSlug}/${payload.productSlug}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokenValue}`,
          "content-Type": "application/json",
        },
        body: bodyRequest,
      },
    );

    if (!response.ok) {
      return Response.json(
        {
          ok: false,
          message: "something went wrong",
          httpStatus: 500,
          data: null,
          isContainErrorDetail: false,
        },
        { status: 500 },
      );
    }

    return new Response(response.body, {
      headers: {
        "Content-Type": response.headers.get("content-type") ?? "text/event-stream",
      },
    });
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
