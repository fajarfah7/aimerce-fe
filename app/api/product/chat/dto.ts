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
