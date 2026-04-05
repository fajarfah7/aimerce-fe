export type LoginPayload = {
  username: string;
  password: string;
};

type TokenResponse = {
  access_token: string;
  refresh_token: string;
};

export type LoginResponse = {
  message: string;
  data: TokenResponse;
  http_status: number;
};
