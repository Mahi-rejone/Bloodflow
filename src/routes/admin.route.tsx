import {
  LayoutDashboard,
  Plus,
  Projector,
  TableIcon,
  UserIcon,
} from "lucide-react";
export const adminRoute = [
  {
    name: "Profile",
    path: "/profile",
    icon: <UserIcon size={16} />,
  },
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <LayoutDashboard size={16} />,
  },
];

export const adminSidebarRoute = [
  {
    label: "Blogs & Events",
    children: [
      {
        label: "Blogs",
        icon: <Projector />,
        grandChild: [
          {
            name: "See all Blogs",
            path: "/blogs",
            icon: <TableIcon />,
          },
          {
            name: "Add a new Blog",
            path: "/blogs/new",
            icon: <Plus />,
          },
        ],
      },
      {
        label: "Events",
        icon: <Projector />,
        grandChild: [
          {
            name: "See all Events",
            path: "/events",
            icon: <TableIcon />,
          },
          {
            name: "Add a new Event",
            path: "/events/new",
            icon: <Plus />,
          },
        ],
      },
    ],
  },
];
