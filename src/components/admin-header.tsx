import { Menu, Search, BellRing } from 'lucide-react';

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
  const showSearch = title === "Users" || title === "Accounts" || title === "Audit Logs" || title === "Transactions";

  return (
    <header className="bg-white border-b border-gray-200 p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden mr-4 text-gray-500"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold md:hidden">Admin Dashboard</h1>
          <h2 className="text-xl font-semibold hidden md:block">{title}</h2>
        </div>
        
        {showSearch && (
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder={`Search ${title.toLowerCase()}...`}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
            </div>
            <button className="text-gray-500 hover:text-gray-700">
              <BellRing className="h-6 w-6" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
} 