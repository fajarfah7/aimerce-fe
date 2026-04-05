export type RegisterPayload = {
  name: string;
  email: string;
  username: string;
  phone_number: string;
  password: string;
  re_password: string;
};

export type RegisterResponse = {
  message: string;
  data: null;
  http_status: number;
};
