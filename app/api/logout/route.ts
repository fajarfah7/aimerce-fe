import { cookies } from "next/headers";

export const POST = async () => {
  (await cookies()).delete("token");
  (await cookies()).delete("refresh_token");

  return Response.json({ message: "success" });
};
