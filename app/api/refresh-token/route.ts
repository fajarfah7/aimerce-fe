import { cookies } from "next/headers";
import { api, extractError } from "../api";
import { RefreshTokenResponse } from "./dto";

export const POST = async () => {
  const cookieStore = await cookies();

  const refreshToken = cookieStore.get("refresh_token");
  if (!refreshToken)
    return Response.json(
      {
        ok: false,
        message: "unauthorized",
        httpStatus: 401,
        data: null,
        isContainErrorDetail: false,
      },
      { status: 401 },
    );

  try {
    const res = await api.post<null, RefreshTokenResponse>(
      "/refresh-token",
      undefined,
      undefined,
      refreshToken.value,
    );

    (await cookies()).set("token", res.data, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 - 3600,
    });
    return Response.json(
      {
        ok: true,
        message: "success",
        httpStatus: 200,
        data: null,
        isContainErrorDetail: false,
      },
      { status: 200 },
    );
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
};
