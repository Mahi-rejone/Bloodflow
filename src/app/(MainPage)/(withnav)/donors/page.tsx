import DonorsPageContent from "./donorsPageContent";

interface PageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;

  return <DonorsPageContent initialSearch={params.q ?? ""} />;
}
