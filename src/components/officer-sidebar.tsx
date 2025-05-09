"use client";

import {
    LogOut,
    PieChart,
    User,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

type SidebarProps = {
    isMenuOpen: boolean;
    setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const navLinks = [
    { path: "/officer/dashboard", label: "Dashboard", icon: PieChart },
    { path: "/officer/customers", label: "Accounts", icon: User },
];

export default function Sidebar({ isMenuOpen, setIsMenuOpen }: SidebarProps) {
    const router = useRouter();
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    const handleLogout = () => {
        // Handle logout logic here
        console.log("Logging out...");
        router.push('/');
    };

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

    const UserProfile = () => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full p-0 h-auto hover:bg-gray-100 rounded-lg">
                    <div className="flex items-center gap-3 p-2 w-full">
                        <Avatar className="h-10 w-10">
                            <AvatarFallback>SJ</AvatarFallback>
                        </Avatar>
                        <div className="text-left">
                            <p className="text-sm font-medium">Sarah Johnson</p>
                            <p className="text-xs text-gray-500">sarah.j@example.com</p>
                        </div>
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
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
                <div className="p-2 border-t">
                    <UserProfile />
                </div>
            </aside>

            {/* Mobile Sidebar with Sheet */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetContent side="left" className="w-64 p-0">
                    <SheetHeader className="p-4 border-b">
                        <SheetTitle className="text-2xl font-bold text-blue-600">BankApp</SheetTitle>
                    </SheetHeader>

                    <ScrollArea className="flex-1 p-4">
                        <NavList />
                    </ScrollArea>

                    <Separator />

                    <div className="pb-4">
                        <UserProfile />
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
}