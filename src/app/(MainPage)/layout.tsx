import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar></Navbar>
      <main className="min-h-screen">{children}</main>
      <Footer></Footer>
      <p>cart sidebar</p>
    </div>
  );
}
