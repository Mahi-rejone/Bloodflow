import { cookies } from "next/headers";

export default async function AuthorizedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  console.log(cookieStore.get('accessToken'));
  return (
    <div>
      <main className="min-h-screen">{children}</main>
    </div>
  );
}
