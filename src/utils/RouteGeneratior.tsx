"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { JSX } from "react/jsx-runtime";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../components/ui/sidebar";
export const RouteGenerator = (
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
      href={`/${role?.toLowerCase()}${d.path}`}
      className="flex items-center gap-2 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
      onClick={() => setUserMenuOpen(false)}
    >
      {d?.icon} {d.name}
    </Link>
  ));
};

export const sideBarRouteGenerator = (
  role: string,
  routeData: {
    label: string;
    children: {
      label: string;
      icon: JSX.Element;
      grandChild: {
        name: string;
        path: string;
        icon: JSX.Element;
      }[];
    }[];
  }[],
) => {
  return routeData?.map((d, i) => (
    <SidebarGroup key={i + 1}>
      <SidebarGroupLabel>{d?.label}</SidebarGroupLabel>
      {d?.children?.map((d2, i_2) => (
        <SidebarGroupContent key={i_2 + 200}>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                {d2.icon}
                {d2.label}
              </SidebarMenuButton>
              <SidebarMenuSub>
                {d2?.grandChild?.map((d3, i_3) => (
                  <SidebarMenuSubItem key={i_3 + 300}>
                    <SidebarMenuSubButton asChild>
                      <Link href={`/${role}/${d3.path}`}>
                        {d3.icon}
                        {d3.name}
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      ))}
    </SidebarGroup>
  ));
};
