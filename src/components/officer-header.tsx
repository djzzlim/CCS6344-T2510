import { Bell, Menu, Search, User } from "lucide-react";


type HeaderProps = {
    title?: string;
    setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  };
  

export default function Header({ title = "Dashboard", setIsMenuOpen }: HeaderProps) {
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
            <h1 className="text-xl font-semibold md:hidden">Officer Dashboard</h1>
            <h2 className="text-xl font-semibold hidden md:block">{title}</h2>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-500">
              <Search className="w-5 h-5" />
            </button>
            <button className="text-gray-500 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 md:hidden">
              <User className="w-4 h-4" />
            </div>
          </div>
        </div>
      </header>
    );
  }