import { cookies } from "next/headers";
import { api, extractError } from "../api";
import { CreateStorePayload, CreateStoreResponse } from "./dto";

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
    const res = await api.post<CreateStorePayload, CreateStoreResponse>(
      "/account/store/create",
      payload,
      undefined,
      tokenValue,
    );
    return Response.json(res, { status: res.http_status });
  } catch (e: unknown) {
    const error = extractError(e);
    return Response.json(
      { message: error.message, status: error.httpStatus },
      { status: error.httpStatus },
    );
  }
}
