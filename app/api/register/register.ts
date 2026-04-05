import { api, ApiResponse, extractData, extractError } from "@/app/api/api";
import { RegisterResponse, type RegisterPayload } from "./dto";

export async function Register(
  payload: RegisterPayload,
): Promise<ApiResponse<RegisterResponse | null>> {
  try {
    const res = await api.post<RegisterPayload, RegisterResponse>("register", payload);
    return extractData<RegisterResponse>(res, res.http_status);
  } catch (e: unknown) {
    return extractError(e);
  }
}
