import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TooltipProvider>
        <div>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </div>
    </TooltipProvider>
  );
}