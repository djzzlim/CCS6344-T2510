import { ArrowDownRight, ArrowUpRight, Clock, CreditCard, PieChart, User } from "lucide-react";

type SidebarProps = {
    isMenuOpen: boolean;
    setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Sidebar({ isMenuOpen, setIsMenuOpen }: SidebarProps) {

    return <div>
        {/* Sidebar - Desktop */}
        <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
            <div className="p-4 border-b border-gray-200">
                <h1 className="text-2xl font-bold text-blue-600">BankApp</h1>
            </div>
            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    <li>
                        <a href="/dashboard" className="flex items-center p-3 text-blue-600 bg-blue-50 rounded-lg">
                            <PieChart className="w-5 h-5 mr-3" />
                            <span className="font-medium">Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a href="/accounts" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                            <CreditCard className="w-5 h-5 mr-3" />
                            <span>Accounts</span>
                        </a>
                    </li>
                    <li>
                        <a href="/transfers" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                            <ArrowUpRight className="w-5 h-5 mr-3" />
                            <span>Transfers</span>
                        </a>
                    </li>
                    <li>
                        <a href="/payments" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                            <ArrowDownRight className="w-5 h-5 mr-3" />
                            <span>Payments</span>
                        </a>
                    </li>
                    <li>
                        <a href="/history" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                            <Clock className="w-5 h-5 mr-3" />
                            <span>History</span>
                        </a>
                    </li>
                </ul>
            </nav>
            <div className="p-4 border-t border-gray-200">
                <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                        <User className="w-5 h-5" />
                    </div>
                    <div className="ml-3">
                        <p className="text-sm font-medium">Sarah Johnson</p>
                        <p className="text-xs text-gray-500">sarah.j@example.com</p>
                    </div>
                </div>
            </div>
        </aside>

        {/* Mobile menu */}
        {isMenuOpen && (
            <div className="md:hidden fixed inset-0 z-50 bg-white">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-blue-600">BankApp</h1>
                    <button
                        onClick={() => setIsMenuOpen(false)}
                        className="text-gray-500"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <nav className="p-4">
                    <ul className="space-y-2">
                        <li>
                            <a href="/dashboard" className="flex items-center p-3 text-blue-600 bg-blue-50 rounded-lg">
                                <PieChart className="w-5 h-5 mr-3" />
                                <span className="font-medium">Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a href="/accounts" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                                <CreditCard className="w-5 h-5 mr-3" />
                                <span>Accounts</span>
                            </a>
                        </li>
                        <li>
                            <a href="/transfers" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                                <ArrowUpRight className="w-5 h-5 mr-3" />
                                <span>Transfers</span>
                            </a>
                        </li>
                        <li>
                            <a href="/payments" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                                <ArrowDownRight className="w-5 h-5 mr-3" />
                                <span>Payments</span>
                            </a>
                        </li>
                        <li>
                            <a href="/history" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                                <Clock className="w-5 h-5 mr-3" />
                                <span>History</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        )}
    </div>
}