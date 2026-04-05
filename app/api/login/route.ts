import { cookies } from "next/headers";
import env from "@/config/env.config";

export const POST = async (req: Request) => {
  const payload = await req.json();

  const res = await fetch(`${env.API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    // credentials: "include",
  });

  const body = await res.json();

  if (!res.ok) {
    return Response.json(body, { status: res.status });
  }

  if (!body.data.access_token) {
    return Response.json({ message: "invalid response" }, { status: 500 });
  }

  (await cookies()).set("token", body.data.access_token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 - 3600,
  });

  (await cookies()).set("refresh_token", body.data.refresh_token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7 - 3600, // 7 days
  });

  return Response.json(body, { status: res.status });
};
