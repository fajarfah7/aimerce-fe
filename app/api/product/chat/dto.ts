export type GetChatMessageRequest = {
  storeSlug: string;
  productSlug: string;
};

export type ChatMessageRequest = {
  message: string;
  storeSlug: string;
  productSlug: string;
};

export type ChatMessageResponse = {
  //   id: string;
  //   conversation_id: string;
  role: string;
  content: string;
  //   created_at: string;
};

export type GetChatMessageResponse = {
  message: string;
  http_status: number;
  data: ChatMessageResponse[] | null;
};
