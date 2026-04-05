import { NextRequest } from "next/server";
import { api, extractError } from "../api";
import { cookies } from "next/headers";
import { UploadFileResponse } from "./dto";

export async function POST(req: NextRequest) {
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

  const fd = await req.formData();
  const file = fd.get("file") as File;
  if (!file)
    return Response.json(
      {
        ok: false,
        message: "missing file",
        httpStatus: 400,
        data: null,
        isContainErrorDetail: false,
      },
      { status: 400 },
    );

  fd.append("path", "product");
  const tokenValue = token.value;
  try {
    const res = await api.post<FormData, UploadFileResponse>(
      "/storage/upload",
      fd,
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
