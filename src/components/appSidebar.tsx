"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Home, Inbox, Settings, Plus, ChevronDown } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "./ui/sidebar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/feature/authSlice";

import { user_role } from "@/const/user.const";

import { sideBarRouteGenerator } from "@/utils/RouteGeneratior";

import { adminSidebarRoute } from "@/routes/admin.route";
import { userSidebarRoute } from "@/routes/user.route";
import { RxDashboard } from "react-icons/rx";

const AppSidebar = () => {
  /**
   * IMPORTANT:
   * Don't render anything until the client has mounted.
   *
   * This prevents hydration mismatch caused by redux-persist
   * loading the current user from localStorage on the client.
   */
  const [mounted, setMounted] = useState(false);

  const currentUser = useAppSelector(selectCurrentUser);
  const items = [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Dashboard",
      url: `/${currentUser?.role?.toLowerCase()}/dashboard`,
      icon: RxDashboard,
    },
    // {
    //   title: "Inbox",
    //   url: "#",
    //   icon: Inbox,
    // },
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: Settings,
    // },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  /**
   * Server:
   *   mounted = false
   *
   * First client render:
   *   mounted = false
   *
   * After hydration:
   *   mounted = true
   *
   * Therefore server and client produce the same initial HTML.
   */
  if (!mounted) {
    return null;
  }

  /**
   * Generate sidebar according to the current user's role.
   */
  let SidebarMenuData: React.ReactNode = null;

  switch (currentUser?.role) {
    case user_role.admin:
      SidebarMenuData = sideBarRouteGenerator(
        user_role.admin.toLowerCase(),
        adminSidebarRoute,
      );
      break;

    case user_role.user:
      SidebarMenuData = sideBarRouteGenerator(
        user_role.user.toLowerCase(),
        userSidebarRoute,
      );
      break;

    default:
      SidebarMenuData = null;
      break;
  }

  return (
    <Sidebar>
      {/* =========================================================
          HEADER
      ========================================================= */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg">
              <Link href="/">
                <div className="flex size-8 items-center justify-center rounded-lg bg-red-50">
                  <span className="text-lg font-bold text-red-600">♡</span>
                </div>

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">BloodFlow</span>

                  <span className="truncate text-xs text-muted-foreground">
                    Blood Donation Platform
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator />

      {/* =========================================================
          CONTENT
      ========================================================= */}
      <SidebarContent>
        {/* =======================================================
            APPLICATION
        ======================================================= */}
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const Icon = item.icon;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <Icon className="size-4" />

                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>

                    {item.title === "Inbox" && (
                      <SidebarMenuBadge>24</SidebarMenuBadge>
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* =======================================================
            USER MANAGEMENT
        ======================================================= */}
        {currentUser?.role === user_role.admin && (
          <SidebarGroup>
            <Collapsible defaultOpen className="group/collapsible">
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger className="flex w-full items-center justify-between">
                  <span>User Management</span>

                  <ChevronDown className="size-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>

              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {/* See All Users */}
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/admin/users">
                          <Inbox className="size-4" />

                          <span>See All Users</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    {/* Add User */}
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/admin/users/create">
                          <Plus className="size-4" />

                          <span>Add User</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </Collapsible>
          </SidebarGroup>
        )}

        {/* =======================================================
            ROLE BASED ROUTES
        ======================================================= */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>{SidebarMenuData}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
