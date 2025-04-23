"use client";

import {
    ArrowDownRight,
    ArrowUpRight,
    Clock,
    CreditCard,
    PieChart,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type SidebarProps = {
    isMenuOpen: boolean;
    setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const navLinks = [
    { path: "/dashboard", label: "Dashboard", icon: PieChart },
    { path: "/accounts", label: "Accounts", icon: CreditCard },
    { path: "/transfers", label: "Transfers", icon: ArrowUpRight },
    { path: "/payments", label: "Payments", icon: ArrowDownRight },
    { path: "/history", label: "History", icon: Clock },
];

export default function Sidebar({ isMenuOpen, setIsMenuOpen }: SidebarProps) {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    const NavList = () => (
        <ul className="space-y-1">
            {navLinks.map(({ path, label, icon: Icon }) => (
                <li key={path}>
                    <Link
                        href={path}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-all ${isActive(path)
                                ? "bg-blue-50 text-blue-600 font-medium"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <Icon className="w-5 h-5" />
                        {label}
                    </Link>
                </li>
            ))}
        </ul>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex fixed top-0 left-0 h-screen w-64 bg-white border-r z-10 flex-col">
                <div className="p-4 border-b">
                    <h1 className="text-2xl font-bold text-blue-600">BankApp</h1>
                </div>
                <ScrollArea className="flex-1 p-4">
                    <NavList />
                </ScrollArea>
                <div className="p-4 border-t">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                            <AvatarFallback>SJ</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-sm font-medium">Sarah Johnson</p>
                            <p className="text-xs text-gray-500">sarah.j@example.com</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Mobile Sidebar with Sheet */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetContent side="left" className="w-64 p-0">
                    <SheetHeader className="p-4 border-b">
                        <SheetTitle className="text-2xl font-bold text-blue-600">BankApp</SheetTitle>
                    </SheetHeader>

                    <ScrollArea className="p-4 flex-1">
                        <NavList />
                    </ScrollArea>

                    <Separator />

                    <div className="p-4">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                                <AvatarFallback>SJ</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-sm font-medium">Sarah Johnson</p>
                                <p className="text-xs text-gray-500">sarah.j@example.com</p>
                            </div>
                        </div>
                    </div>
                </SheetContent>

            </Sheet>
        </>
    );
}
