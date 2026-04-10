import env from "@/config/env.config";
import { ChatMessageRequest } from "./dto";

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
