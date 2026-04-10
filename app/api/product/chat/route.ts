import { cookies } from "next/headers";
import { extractError } from "../../api";
import env from "@/config/env.config";
import { ChatMessageRequest } from "./dto";

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
