import Link from "next/link";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function SidebarAccount({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 flex justify-center p-4">
        <div className="flex flex-col md:flex-row w-full max-w-5xl min-h-screen md:min-h-[80vh] bg-white shadow rounded-lg overflow-hidden">
          {/* Sidebar */}
          <aside className="md:w-56 border-b md:border-b-0 md:border-r bg-gray-50">
            <nav className="flex md:flex-col overflow-x-auto md:overflow-visible p-3 gap-2">
              <Link
                href={"/account/profile"}
                className="px-4 py-2 rounded hover:bg-gray-200 whitespace-nowrap"
              >
                Profile
              </Link>
              <Link
                href={"/account/store"}
                className="px-4 py-2 rounded hover:bg-gray-200 whitespace-nowrap"
              >
                Store
              </Link>
              <Link
                href={"/account/product"}
                className="px-4 py-2 rounded hover:bg-gray-200 whitespace-nowrap"
              >
                Products
              </Link>
              <Link
                href={"/account"}
                className="px-4 py-2 rounded hover:bg-gray-200 whitespace-nowrap"
              >
                Settings#
              </Link>
            </nav>
          </aside>

          {/* Content */}
          <div className="flex-1 p-6 md:p-10 flex flex-col">{children}</div>
        </div>
      </div>
      <Footer />
    </>
  );
}
