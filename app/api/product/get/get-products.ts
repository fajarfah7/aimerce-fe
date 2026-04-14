import { api, ApiResponse, extractData, extractError } from "../../api";
import { ProductCardPagination } from "./dto";

export async function GetProductCards(
  queryParams: Record<string, string>,
): Promise<ApiResponse<ProductCardPagination | null>> {
  try {
    const query = new URLSearchParams(queryParams).toString();
    const result: ProductCardPagination = await api.get(`/products?${query}`);
    return extractData<ProductCardPagination>(result, result.http_status);
  } catch (e: unknown) {
    return extractError(e);
  }
}
