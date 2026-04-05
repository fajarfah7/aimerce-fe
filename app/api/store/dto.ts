export type CreateStorePayload = {
  slug: string;
  name: string;
  email: string;
  phone_number: string;
  address: string;
  description: string;
};

export type CreateStoreResponse = {
  message: string;
  data: null;
  http_status: number;
};
