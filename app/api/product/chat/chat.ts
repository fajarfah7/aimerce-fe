import env from "@/config/env.config";
import {
  ChatMessageRequest,
  ChatMessageResponse,
  GetChatMessageResponse,
  GetChatMessageRequest,
} from "./dto";
import { api, ApiResponse, extractData, extractError } from "../../api";

export async function GetChatMessage(
  payload: GetChatMessageRequest,
): Promise<ApiResponse<ChatMessageResponse[] | null>> {
  try {
    const result = await api.get<GetChatMessageResponse>(
      `/api/product/chat?store_slug=${payload.storeSlug}&product_slug=${payload.productSlug}`,
      env.BRIDGE_API_URL,
    );
    return extractData<ChatMessageResponse[] | null>(result.data, result.http_status);
  } catch (e: unknown) {
    return extractError(e);
  }
}

export async function SendChatMessage(payload: ChatMessageRequest): Promise<Response | null> {
  try {
    const res = await fetch(`${env.BRIDGE_API_URL}/api/product/chat`, {
      method: "POSt",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    return res;
  } catch (e: unknown) {
    console.log("error: ", e);
    return null;
  }
}
