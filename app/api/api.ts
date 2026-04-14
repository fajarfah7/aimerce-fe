import env from "@/config/env.config";

export type PaginationResponse = {
  page: number | null;
  per_page: number | null;
  last_page: number | null;
};

export type ApiResponse<T> = {
  ok: boolean;
  message: string;
  httpStatus: number;
  data: T | null;
  isContainErrorDetail: boolean;
  errorDetail?: Record<string, string[]> | null;
  paginationResponse?: PaginationResponse | null;
};

export class ResponseError extends Error {
  detail: Record<string, string[]> | null;
  httpStatus: number;
  constructor(message: string, detail: Record<string, string[]> | null, httpStatus: number) {
    super(message);
    this.detail = detail;
    this.httpStatus = httpStatus;
  }
}

export function extractData<T>(data: T, httpStatus: number): ApiResponse<T> {
  return {
    ok: true,
    message: "success",
    data: data,
    httpStatus: httpStatus,
    isContainErrorDetail: false,
  };
}

export function extractError(e: unknown): ApiResponse<null> {
  if (e instanceof ResponseError) {
    return {
      ok: false,
      message: e.message,
      data: null,
      httpStatus: e.httpStatus,
      isContainErrorDetail: e.detail !== null,
      errorDetail: e.detail,
    };
  } else if (e instanceof Error) {
    return {
      ok: false,
      message: e.message,
      data: null,
      httpStatus: 500,
      isContainErrorDetail: false,
    };
  }
  return {
    ok: false,
    message: "unknown error occured",
    data: null,
    httpStatus: 500,
    isContainErrorDetail: false,
  };
}

export const api = {
  async get<TRes>(
    path: string,
    // queryParams?: string,
    bridgeApi?: string,
    token?: string,
  ): Promise<TRes> {
    const baseApi = bridgeApi ?? env.API_URL;

    const url = path.startsWith("/") ? `${baseApi}${path}` : `${baseApi}/${path}`;
    // if (queryParams) {
    //   url = `${url}?${queryParams}`;
    // }

    const headers: HeadersInit = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(url, {
      method: "GET",
      headers,
    });

    const body = await res.json();

    if (!res.ok) {
      const message: string = body?.message ?? "unknown error occurred";
      const detail: Record<string, string[]> | null = body?.detail ?? null;
      const httpStatus: number = body?.http_status ?? res.status;

      throw new ResponseError(message, detail, httpStatus);
    }

    return body as TRes;
  },
  async post<TReq, TRes>(
    path: string,
    data?: TReq,
    bridgeApi?: string,
    token?: string,
  ): Promise<TRes> {
    const baseApi = bridgeApi ?? env.API_URL;

    const url = path.startsWith("/") ? `${baseApi}${path}` : `${baseApi}/${path}`;

    const headers: HeadersInit = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    let bodyPayload: BodyInit | undefined;

    if (data) {
      if (data instanceof FormData) {
        bodyPayload = data;
      } else {
        bodyPayload = JSON.stringify(data);
        headers["Content-Type"] = "application/json";
      }
    }

    const res = await fetch(url, {
      method: "POST",
      headers,
      body: bodyPayload,
    });
    console.log("res ==>", res);

    const body = await res.json();
    console.log("body ==>", body);

    if (!res.ok) {
      const message: string = body?.message ?? "unknown error occurred";
      const detail: Record<string, string[]> | null = body?.detail ?? null;
      const httpStatus: number = body?.http_status ?? res.status;

      throw new ResponseError(message, detail, httpStatus);
    }

    return body as TRes;
  },
};
