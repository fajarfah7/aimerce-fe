export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main>
        <div className="flex flex-col items-center justify-center min-h-screen">{children}</div>
      </main>
    </>
  );
}
