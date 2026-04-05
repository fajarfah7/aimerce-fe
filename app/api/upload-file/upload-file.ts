import env from "@/config/env.config";
import { api, ApiResponse, extractData, extractError } from "../api";
import { UploadFileResponse } from "./dto";

export async function UploadFile(
  payload: FormData,
): Promise<ApiResponse<UploadFileResponse | null>> {
  try {
    const res = await api.post<FormData, UploadFileResponse>(
      "/api/upload-file",
      payload,
      env.BRIDGE_API_URL,
    );
    return extractData<UploadFileResponse>(res, res.http_status);
  } catch (e: unknown) {
    return extractError(e);
  }
}
