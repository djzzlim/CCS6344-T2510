"use client";

import { useState, useEffect } from 'react';
import {
    LogOut,
    PieChart,
    Users,
    CreditCard,
    Activity,
    Settings,
    AlertCircle,
    FileText
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

interface UserProfile {
    userID: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}

export default function Sidebar({ isMenuOpen, setIsMenuOpen }: SidebarProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch('/api/user/profile', {
                    credentials: 'include'
                });

                if (response.ok) {
                    const userData = await response.json();
                    setUserProfile({
                        userID: userData.UserID || userData.id || '',
                        firstName: userData.FirstName || 'Admin',
                        lastName: userData.LastName || 'User',
                        email: userData.Email || 'admin@example.com',
                        role: userData.Role || 'Admin'
                    });
                } else {
                    console.error('Failed to fetch user profile');
                    // If we can't fetch the profile, redirect to login
                    router.push('/auth/login');
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserProfile();
    }, [router]);

    const handleLogout = async () => {
        try {
            const response = await fetch('/api/logout', {
                method: 'POST',
                credentials: 'include',
            });

            if (response.ok) {
                router.push('/auth/login');
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const isActive = (path: string) => {
        return pathname === path || pathname.startsWith(`${path}/`);
    };

    const navLinks = [
        { path: '/admin/dashboard', label: 'Dashboard', icon: PieChart },
        { path: '/admin/users', label: 'Users', icon: Users },
        { path: '/admin/accounts', label: 'Accounts', icon: CreditCard },
        { path: '/admin/audit', label: 'Audit Logs', icon: AlertCircle },
    ];

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

    const UserProfile = () => {
        if (isLoading || !userProfile) {
            return (
                <Button variant="ghost" className="w-full p-0 h-auto hover:bg-gray-100 rounded-lg">
                    <div className="flex items-center gap-3 p-2 w-full">
                        <Avatar className="h-10 w-10">
                            <AvatarFallback>AU</AvatarFallback>
                        </Avatar>
                        <div className="text-left">
                            <p className="text-sm font-medium">Loading...</p>
                        </div>
                    </div>
                </Button>
            );
        }

        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="w-full p-0 h-auto hover:bg-gray-100 rounded-lg">
                        <div className="flex items-center gap-3 p-2 w-full">
                            <Avatar className="h-10 w-10">
                                <AvatarFallback>
                                    {userProfile.firstName[0]}{userProfile.lastName[0]}
                                </AvatarFallback>
                            </Avatar>
                            <div className="text-left">
                                <p className="text-sm font-medium">{userProfile.firstName} {userProfile.lastName}</p>
                                <p className="text-xs text-gray-500">{userProfile.email}</p>
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
    };

    if (isLoading) {
        return null; // Or a loading spinner
    }

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex fixed top-0 left-0 h-screen w-64 bg-white border-r z-10 flex-col">
                <div className="p-4 border-b">
                    <h1 className="text-2xl font-bold text-blue-600">BankApp Admin</h1>
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
                        <SheetTitle className="text-2xl font-bold text-blue-600">BankApp Admin</SheetTitle>
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