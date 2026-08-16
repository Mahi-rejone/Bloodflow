export const dynamic = "force-dynamic";
import UrlRedirect from "@/components/urlRedirect";
import { cookies } from "next/headers";

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
    <div>
      <main className="min-h-screen">{children}</main>
    </div>
  );
}
