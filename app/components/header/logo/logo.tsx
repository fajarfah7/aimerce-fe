import Link from "next/link";

export function Logo() {
  return (
    <>
      <h1>
        <Link href={"/dashboard"}>Logo</Link>
      </h1>
    </>
  );
}
