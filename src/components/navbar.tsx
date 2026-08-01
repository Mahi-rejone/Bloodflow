"use client";

import { useState } from "react";
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
  UserIcon,
  SearchIcon,
} from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/feature/authSlice";

export default function Navbar() {
const user = useAppSelector(selectCurrentUser);

  const { notificationCount, setIsNotificationsOpen } = {
    notificationCount: 3,
    setIsNotificationsOpen: (_data: any) => {},
  };

  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

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

  return (
    <nav className="bg-white sticky top-0 z-50 border-b border-app-border">
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
                className="w-full pl-8 pr-3 py-2 bg-zinc-50 rounded-full border border-app-border focus:ring-2 focus:ring-app-primary/30 focus:outline-none transition-all"
              />
            </div>
          </form>
        </div>

        {/* Right side: CTA + notifications + user menu (desktop) */}
        <div className="hidden md:flex items-center gap-4 justify-self-end">
          <Link
            href="/requests/new"
            className="bg-app-primary hover:bg-app-primary-dark text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
          >
            Request Blood
          </Link>

          <button
            onClick={() => setIsNotificationsOpen(true)}
            className="relative p-2 rounded-full hover:bg-zinc-100 transition-colors"
            aria-label="Notifications"
          >
            <BellIcon size={20} className="text-zinc-600" />
            {notificationCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-app-primary text-white text-[10px] font-semibold rounded-full h-4 w-4 flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </button>

          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full hover:bg-zinc-100 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-app-primary/10 text-app-primary flex items-center justify-center text-sm font-semibold">
                {user?.username.charAt(0)}
              </div>
              <ChevronDown size={16} className="text-zinc-500" />
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-app-border rounded-lg shadow-lg py-2">
                <div className="px-4 py-2 border-b border-app-border">
                  <p className="text-sm font-medium text-app-text">
                    {user?.username}
                  </p>
                  <p className="text-xs text-app-text-light truncate">
                    {user?.email}
                  </p>
                </div>

                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
                  onClick={() => setUserMenuOpen(false)}
                >
                  <UserIcon size={16} /> Profile
                </Link>

                {user?.role==="ADMIN" && (
                  <Link
                    href="/admin"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <LayoutDashboard size={16} /> Dashboard
                  </Link>
                )}

                <button
                  onClick={() => {
                    setUserMenuOpen(false);
                    router.push("/logout");
                  }}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-zinc-50"
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
        <div className="md:hidden border-t border-app-border bg-white px-4 py-4 space-y-4">
          <form onSubmit={handleSearch} className="sm:hidden">
            <div className="relative w-full">
              <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search donors by name or blood group..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-2 bg-zinc-50 rounded-full border border-app-border focus:ring-2 focus:ring-app-primary/30 focus:outline-none transition-all"
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
            className="block text-center bg-app-primary hover:bg-app-primary-dark text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Request Blood
          </Link>

          <div className="flex items-center justify-between pt-3 border-t border-app-border">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-app-primary/10 text-app-primary flex items-center justify-center text-sm font-semibold">
                {user?.username.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium text-app-text">{user?.username}</p>
                <p className="text-xs text-app-text-light truncate">
                  {user?.email}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                router.push("/logout");
              }}
              className="text-red-600"
              aria-label="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>

          {user?.role==="ADMIN" && (
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-sm text-zinc-700"
            >
              <LayoutDashboard size={16} /> Dashboard
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
