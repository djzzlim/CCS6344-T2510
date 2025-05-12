import { Menu, Search, Bell, User } from 'lucide-react';

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
          <h1 className="text-xl font-semibold md:hidden">BankApp</h1>
          <h2 className="text-xl font-semibold hidden md:block">{title}</h2>
        </div>
      </div>
    </header>
  );
}
