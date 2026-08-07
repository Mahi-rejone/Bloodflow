"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell, Home, LogOut, Moon, Settings, Sun, User } from "lucide-react";
import Swal from "sweetalert2";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { SidebarTrigger } from "./ui/sidebar";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, selectCurrentUser } from "@/redux/feature/authSlice";
import { useLogOutMutation } from "@/redux/feature/auth/authApi";
import { useEffect, useState } from "react";

const AdminNavbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const [userLogout] = useLogOutMutation();

  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const pageTitle =
    pathname
      ?.split("/")
      .filter(Boolean)
      .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
      .join(" / ") || "Dashboard";

  const handleLogout = async () => {
    setUserMenuOpen(false);
    setMobileMenuOpen(false);
    setIsMounted(false);
    const result = await userLogout(undefined).unwrap();
    if (result?.success) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Successfully Logged out.",
        showConfirmButton: false,
        timer: 1500,
      });
      dispatch(logout());
      return router.push("/");
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/40 bg-white/70 backdrop-blur-xl shadow-sm">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left */}
        <div className="flex items-center gap-4">
          <SidebarTrigger />

          <div>
            <h1 className="text-lg font-semibold text-zinc-900">{pageTitle}</h1>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <Home className="h-5 w-5" />
            </Link>
          </Button>

          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full p-0"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/avatar.png" />

                  <AvatarFallback>
                    {mounted ? user?.username?.slice(0, 2).toUpperCase() : ""}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-60">
              <DropdownMenuLabel className="flex flex-col">
                <span className="font-semibold">{user?.username}</span>

                <span className="text-xs text-muted-foreground">
                  {user?.email}
                </span>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <Link href="/admin/profile">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href="/admin/account">
                  <User className="mr-2 h-4 w-4" />
                  My Account
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href="/admin/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Go to Website
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer text-red-600 focus:text-red-600"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
