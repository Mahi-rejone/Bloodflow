import UrlRedirect from "@/components/urlRedirect";
import { cookies } from "next/headers";
import AppSidebar  from "@/components/appSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AdminNavbar from "@/components/adminNavbar";

export default async function AuthorizedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  if (!token) {
    return <UrlRedirect url="/login" key={1} />;
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AdminNavbar />
        {children}</SidebarInset>
    </SidebarProvider>
  );
}
