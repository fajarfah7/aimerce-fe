import { NextRequest, NextResponse } from "next/server";
import { refreshToken } from "./app/api/refresh-token/refresh-token";

export const proxy = async (req: NextRequest) => {
  const token = req.cookies.get("token");

  const isLoginPage = req.nextUrl.pathname === "/login";

  if (isLoginPage && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  const isProtectedRoute =
    req.nextUrl.pathname.startsWith("/dashboard") || req.nextUrl.pathname.startsWith("/account");

  if (isProtectedRoute && !token) {
    const refresh = req.cookies.get("refresh_token");
    if (!refresh) return NextResponse.redirect(new URL("/login", req.url));

    const res = await refreshToken();
    if (!res.ok) return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
};

export default proxy;

export const config = {
  matcher: ["/login", "/dashboard/:path*", "/account/:path*"],
};
