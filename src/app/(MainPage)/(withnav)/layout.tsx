import Navbar from "@/components/navbar";
import Footer from "@/components/footer";


export default function WithNavLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <div>
          <Navbar />
          <div className="min-h-screen">{children}</div>
          <Footer />
        </div>
  );
}