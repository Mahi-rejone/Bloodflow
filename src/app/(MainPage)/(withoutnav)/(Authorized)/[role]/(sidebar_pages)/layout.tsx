"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppSidebar from "@/components/appSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AdminNavbar from "@/components/adminNavbar";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/feature/authSlice";
import { Alert } from "antd";

const STAFF_ROLES = ["ADMIN", "BLOOD_BANK_MANAGER", "HOSPITAL_REPRESENTATIVE"];

export default function SidebarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = useAppSelector(selectCurrentUser);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isStaff =
    mounted && currentUser && STAFF_ROLES.includes(currentUser.role);

  useEffect(() => {
    if (!mounted) return;
    if (!isStaff) {
      const timer = setTimeout(() => router.push("/"), 2000);
      return () => clearTimeout(timer);
    }
  }, [mounted, isStaff, router]);

  if (!mounted) return null;

  if (!isStaff) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <Alert
          type="error"
          title="Access denied"
          description="You don't have permission to view this area. Redirecting..."
          showIcon
          className="max-w-md"
        />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AdminNavbar />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
