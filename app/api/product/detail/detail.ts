import { api, ApiResponse, extractData, extractError } from "../../api";
import { ProductDetail } from "./dto";

export async function GetProductDetail(
  storeSlug: string,
  productSlug: string,
): Promise<ApiResponse<ProductDetail | null>> {
  try {
    const result: ProductDetail = await api.get(`/product/${storeSlug}/${productSlug}`);
    return extractData<ProductDetail>(result, result.http_status);
  } catch (e: unknown) {
    return extractError(e);
  }
}
