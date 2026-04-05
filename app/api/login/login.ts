import env from "@/config/env.config";
import { api, ApiResponse, extractData, extractError } from "../api";
import { LoginPayload, type LoginResponse } from "./dto";

export async function Login(payload: LoginPayload): Promise<ApiResponse<null>> {
  try {
    const res = await api.post<LoginPayload, LoginResponse>(
      "/api/login",
      payload,
      env.BRIDGE_API_URL,
    );
    return extractData<null>(null, res.http_status);
  } catch (e: unknown) {
    return extractError(e);
  }
}
