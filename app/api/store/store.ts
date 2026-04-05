import env from "@/config/env.config";
import { api, ApiResponse, extractData, extractError } from "../api";
import { CreateStorePayload, CreateStoreResponse } from "./dto";

export async function CreateStore(payload: CreateStorePayload): Promise<ApiResponse<null>> {
  try {
    const res = await api.post<CreateStorePayload, CreateStoreResponse>(
      "/api/account/store",
      payload,
      env.BRIDGE_API_URL,
    );
    return extractData<null>(null, res.http_status);
  } catch (e: unknown) {
    return extractError(e);
  }
}
