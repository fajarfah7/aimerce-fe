import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>
        <div className="flex min-h-screen items-center justify-center bg-zinc-100 font-sans dark:bg-black">
          <div className="flex min-h-screen w-full max-w-6xl flex-col items-center justify-between sm:items-start p-2 md:p-10 bg-white dark:bg-black">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
