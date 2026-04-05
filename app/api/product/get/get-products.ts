import { api, ApiResponse, extractData, extractError } from "../../api";
import { ProductCardPagination } from "./dto";

export async function GetProductCards(
  query: string,
): Promise<ApiResponse<ProductCardPagination | null>> {
  try {
    const result: ProductCardPagination = await api.get("/products", query, undefined);
    return extractData<ProductCardPagination>(result, result.http_status);
  } catch (e: unknown) {
    return extractError(e);
  }
}
