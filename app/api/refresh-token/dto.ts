export type RefreshTokenPayload = {
  token: string;
};

export type RefreshTokenResponse = {
  message: string;
  data: string;
  http_status: number;
};
