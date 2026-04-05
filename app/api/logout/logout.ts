import env from "@/config/env.config";
import { api, ApiResponse } from "../api";

export async function Logout(): Promise<ApiResponse<null>> {
  await api.post("/api/logout", null, env.BRIDGE_API_URL);
  return { ok: true, message: "success", isContainErrorDetail: false, data: null, httpStatus: 200 };
}
