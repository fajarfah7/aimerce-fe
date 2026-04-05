import { cookies } from "next/headers";
import { RefreshTokenPayload, RefreshTokenResponse } from "./dto";
import { api, ApiResponse, extractError } from "../api";

export const refreshToken = async (): Promise<ApiResponse<null>> => {
  const cookieStore = await cookies();

  const refreshToken = cookieStore.get("refresh_token");
  if (!refreshToken)
    return {
      ok: false,
      message: "unauthorized",
      httpStatus: 401,
      data: null,
      isContainErrorDetail: false,
    };

  try {
    const res = await api.post<RefreshTokenPayload, RefreshTokenResponse>(
      "/refresh-token",
      { token: refreshToken.value },
      undefined,
      undefined,
    );

    (await cookies()).set("token", res.data, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 - 3600,
    });

    return {
      ok: true,
      message: "success",
      httpStatus: 200,
      data: null,
      isContainErrorDetail: false,
    };
  } catch (e: unknown) {
    const error = extractError(e);
    return {
      ok: false,
      message: error.message,
      httpStatus: error.httpStatus,
      data: null,
      isContainErrorDetail: false,
    };
  }
};
