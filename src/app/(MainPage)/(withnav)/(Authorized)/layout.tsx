import AuthGuard from "@/components/AuthGuard";

export default function AuthorizedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard>
      <main className="min-h-screen">{children}</main>
    </AuthGuard>
  );
}
