
import { TooltipProvider } from "@/components/ui/tooltip";

export default function WithNavLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TooltipProvider>
      <div>
        <main className="min-h-screen">{children}</main>
      </div>
    </TooltipProvider>
  );
}
