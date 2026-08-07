import { Projector, TableIcon, UserIcon } from "lucide-react";
export const userRoute = [
  {
    name: "Profile",
    path: "/profile",
    icon: <UserIcon size={16} />,
  },
];

export const userSidebarRoute = [
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
        ],
      },
    ],
  },
];
