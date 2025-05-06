import { Menu, Search, PlusCircle } from "lucide-react";
import Link from "next/link";

type HeaderProps = {
  title?: string;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  searchTerm?: string;
  setSearchTerm?: React.Dispatch<React.SetStateAction<string>>;
};

export default function Header({ 
  title = "Dashboard", 
  setIsMenuOpen,
  searchTerm = "",
  setSearchTerm = () => {}
}: HeaderProps) {
  const isCustomersPage = title === "Customers";

  return (
    <>
      {isCustomersPage ? (
        <header className="bg-white shadow">
          <div className="px-4 py-3 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Customer Database</h2>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search customers..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Link href="/add-customer" className="px-3 py-2 bg-blue-600 text-white rounded-md flex items-center text-sm hover:bg-blue-700">
                <PlusCircle className="h-4 w-4 mr-1" />
                New Customer
              </Link>
            </div>
          </div>
        </header>
      ) : (
        <header className="bg-white border-b border-gray-200 p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <button
                onClick={() => setIsMenuOpen(true)}
                className="md:hidden mr-4 text-gray-500"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-xl font-semibold md:hidden">Officer Dashboard</h1>
              <h2 className="text-xl font-semibold hidden md:block">{title}</h2>
            </div>
          </div>
        </header>
      )}
    </>
  );
}