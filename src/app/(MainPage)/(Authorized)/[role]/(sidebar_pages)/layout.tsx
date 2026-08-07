import AppSidebar  from "@/components/appSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AdminNavbar from "@/components/adminNavbar";

export default async function AuthorizedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AdminNavbar />
        {children}</SidebarInset>
    </SidebarProvider>
  );
}
