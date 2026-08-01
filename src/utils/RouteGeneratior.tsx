import Link from "next/link";
import { JSX } from "react/jsx-runtime";

const RouteGenerator = (
  role: string,
  routeData: {
    name: string;
    path: string;
    icon: JSX.Element;
  }[],
  setUserMenuOpen: any,
) => {
  return routeData?.map((d, i) => (
    <Link
      key={i + 1}
      href={`/${role?.toLowerCase()}/${d.path}`}
      className="flex items-center gap-2 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
      onClick={() => setUserMenuOpen(false)}
    >
      {d?.icon} {d.name}
    </Link>
  ));
};

export default RouteGenerator;
