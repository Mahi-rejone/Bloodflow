"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  DropletsIcon,
  BellIcon,
  Menu,
  X,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  SearchIcon,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  logout,
  selectCurrentToken,
  selectCurrentUser,
} from "@/redux/feature/authSlice";
import { useLogOutMutation } from "@/redux/feature/auth/authApi";
import Swal from "sweetalert2";
import { RouteGenerator } from "@/utils/RouteGeneratior";
import { user_role } from "@/const/user.const";
import { userRoute } from "@/routes/user.route";
import { adminRoute } from "@/routes/admin.route";
import { useGetUnreadCountQuery } from "@/redux/feature/notification/notificationApi";
import NotificationsPanel from "./NotificationsPanel";

export default function Navbar() {
  const user = useAppSelector(selectCurrentUser);
  const token = useAppSelector(selectCurrentToken);
  const dispatch = useAppDispatch();
  const [userLogout] = useLogOutMutation();

  
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const router = useRouter();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  const { data: unreadData } = useGetUnreadCountQuery(undefined, {
    skip: !isMounted || !user,
    pollingInterval: 30000, 
  });
  const notificationCount = unreadData?.data?.count ?? 0;
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/donors?q=${encodeURIComponent(searchQuery)}`);
    }
  };
  
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/donors", label: "Find Donors" },
    { href: "/requests", label: "Blood Requests" },
    { href: "/blogs", label: "Blogs & Events" },
  ];
  
  useEffect(() => {
    if (token) {
      setIsMounted(true);
    }
  }, [token]);
  
  const handleLogout = async () => {
    setUserMenuOpen(false);
    setMobileMenuOpen(false);
    setIsMounted(false);
    const result = await userLogout(undefined).unwrap();
    if (result?.success) {
      await fetch("api/auth/session_out",{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
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
  
  let MenuData;
  switch (user?.role) {
    case user_role.admin:
      MenuData = RouteGenerator(user_role.admin, adminRoute, setUserMenuOpen);
      break;
      case user_role.user:
        MenuData = RouteGenerator(user_role.user, userRoute, setUserMenuOpen);
        break;
        default:
          MenuData = <></>;
        }
        
        return (
  <>    
          <nav className="bg-white/60 backdrop-blur-xl supports-[backdrop-filter]:bg-white/40 sticky top-0 z-50 border-b border-white/40 shadow-[0_1px_20px_rgba(0,0,0,0.04)]">
      <div className="w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 gap-4 md:grid md:grid-cols-[auto_1fr_auto] md:justify-normal">
        {/* Logo - leftmost */}
        <Link
          href="/"
          className="flex items-center gap-2 text-[22px] font-medium shrink-0"
          >
          <DropletsIcon size={28} className="text-app-primary" /> BloodFlow
        </Link>

        {/* Center: nav links + search bar */}
        <div className="hidden md:flex items-center justify-center gap-6">
          <div className="flex items-center gap-6 text-sm text-zinc-600 shrink-0">
            {navLinks.map((link) => (
              <Link
              key={link.href}
              href={link.href}
              className="hover:text-app-primary transition-colors whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <form onSubmit={handleSearch} className="w-full max-w-sm text-sm">
            <div className="relative w-full">
              <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search donors by name or blood group..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-2 bg-white/50 backdrop-blur-sm rounded-full border border-white/60 focus:ring-2 focus:ring-app-primary/30 focus:outline-none transition-all"
                />
            </div>
          </form>
        </div>

        {/* Right side: CTA + notifications + user menu (desktop) */}
        <div className="hidden md:flex items-center gap-4 justify-self-end">
          <Link
            href={`/requests/new`}
            className="bg-app-primary/90 backdrop-blur-sm hover:bg-app-primary-dark text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors whitespace-nowrap shadow-sm"
            >
            Request Blood
          </Link>

          {isMounted ? (
            <button
            onClick={() => setIsNotificationsOpen(true)}
            className="relative p-2 rounded-full hover:bg-white/50 transition-colors"
            aria-label="Notifications"
            >
              <BellIcon size={20} className="text-zinc-600" />
              {notificationCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-app-primary text-white text-[10px] font-semibold rounded-full h-4 w-4 flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </button>
          ) : (
            <></>
          )}

          <div className="relative">
            {isMounted ? (
              <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full hover:bg-white/50 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-app-primary/10 text-app-primary flex items-center justify-center text-sm font-semibold">
                  {isMounted && user?.username.charAt(0)
                    ? user?.username.charAt(0)
                    : ""}
                </div>
                <ChevronDown size={16} className="text-zinc-500" />
              </button>
            ) : (
              <Link
                href="/login"
                className="bg-app-primary/90 backdrop-blur-sm hover:bg-app-primary-dark text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors whitespace-nowrap shadow-sm"
              >
                Login
              </Link>
            )}

            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white/70 backdrop-blur-xl supports-[backdrop-filter]:bg-white/50 border border-white/50 rounded-lg shadow-xl py-2">
                <div className="px-4 py-2 border-b border-white/40">
                  <p className="text-sm font-medium text-app-text">
                    {user?.username}
                  </p>
                  <p className="text-xs text-app-text-light truncate">
                    {user?.email}
                  </p>
                </div>

                {MenuData}

                <button
                  onClick={() => handleLogout()}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-white/50"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 -mr-2 text-zinc-700"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/40 bg-white/70 backdrop-blur-xl supports-[backdrop-filter]:bg-white/50 px-4 py-4 space-y-4">
          <form onSubmit={handleSearch} className="sm:hidden">
            <div className="relative w-full">
              <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search donors by name or blood group..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-2 bg-white/50 backdrop-blur-sm rounded-full border border-white/60 focus:ring-2 focus:ring-app-primary/30 focus:outline-none transition-all"
              />
            </div>
          </form>

          <div className="flex flex-col gap-3 text-sm text-zinc-700">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Link
            href="/requests/new"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-center bg-app-primary/90 backdrop-blur-sm hover:bg-app-primary-dark text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-sm"
          >
            Request Blood
          </Link>

          {/* Auth section: mirrors the desktop logic instead of assuming logged-in */}
          {isMounted ? (
            <>
              <div className="flex items-center justify-between pt-3 border-t border-white/40">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    router.push("user/profile");
                  }}
                  className="flex items-center gap-3 text-left flex-1 min-w-0 rounded-lg -m-1 p-1 hover:bg-white/50 transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-app-primary/10 text-app-primary flex items-center justify-center text-sm font-semibold shrink-0">
                    {user?.username?.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-app-text truncate">
                      {user?.username}
                    </p>
                    <p className="text-xs text-app-text-light truncate">
                      {user?.email}
                    </p>
                  </div>
                </button>

                <button
                  onClick={handleLogout}
                  className="text-red-600 p-1 shrink-0"
                  aria-label="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>

              {user?.role === user_role.admin && (
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-sm text-zinc-700"
                >
                  <LayoutDashboard size={16} /> Dashboard
                </Link>
              )}
            </>
          ) : (
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center bg-app-primary/90 backdrop-blur-sm hover:bg-app-primary-dark text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-sm"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
    <NotificationsPanel
      open={isNotificationsOpen}
      onClose={() => setIsNotificationsOpen(false)}
    />
  </>  
  );
}
  