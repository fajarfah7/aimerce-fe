import { ApiResponse, extractError, api, extractData } from "../../api";
import { AddProductRequest, AddProductResponse } from "./dto";
import env from "@/config/env.config";

export async function AddProduct(payload: AddProductRequest): Promise<ApiResponse<null>> {
  try {
    const res = await api.post<AddProductRequest, AddProductResponse>(
      "/api/product/add",
      payload,
      env.BRIDGE_API_URL,
    );
    return extractData<null>(null, res.http_status);
  } catch (e: unknown) {
    return extractError(e);
  }
}
