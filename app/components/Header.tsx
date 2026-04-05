import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import HeaderClient from "./HeaderClient";

export default async function Header() {
  const cookieStorage = await cookies();
  const token: RequestCookie | undefined = cookieStorage.get("token");
  const isLoggedIn: boolean = !!token;
  return <HeaderClient isLoggedIn={isLoggedIn} />;
}
