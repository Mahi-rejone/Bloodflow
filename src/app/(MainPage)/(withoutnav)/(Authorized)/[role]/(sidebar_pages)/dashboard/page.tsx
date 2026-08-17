"use client";

import Link from "next/link";
import {
  Users,
  Droplets,
  CheckCircle2,
  Activity,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useGetAllDonorsQuery } from "@/redux/feature/user/userApi";
import { useGetPendingRequestsQuery } from "@/redux/feature/blood/bloodRequestApi";
import { useGetCompletedRequestsCountQuery } from "@/redux/feature/blood/bloodRequestApi";
import AppBarChart from "@/components/AppBarChart";
import CardList from "@/components/CardList";
import AppPieChart from "@/components/AppPieChart";
import TodoList from "@/components/TodoList";
import AppAreaChart from "@/components/AppAreaChart";

// Enhanced StatCard with trend support
function StatCard({
  title,
  value,
  loading,
  icon: Icon,
  href,
  trend,
  trendLabel = "from last month",
}: {
  title: string;
  value: number;
  loading: boolean;
  icon: React.ElementType;
  href: string;
  trend?: number;
  trendLabel?: string;
}) {
  return (
    <Link href={href}>
      <Card className="group transition-all duration-200 hover:shadow-md hover:border-app-primary/30">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-app-text-light">
            {title}
          </CardTitle>
          <div className="rounded-lg bg-app-primary/10 p-2 text-app-primary transition-colors group-hover:bg-app-primary/20">
            <Icon className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-8 w-20" />
          ) : (
            <>
              <div className="text-2xl font-bold text-app-text">
                {value.toLocaleString()}
              </div>
              {trend !== undefined && (
                <div className="mt-1 flex items-center gap-1">
                  <span
                    className={cn(
                      "inline-flex items-center text-xs font-medium",
                      trend > 0 ? "text-green-600" : "text-red-600",
                    )}
                  >
                    {trend > 0 ? (
                      <TrendingUp className="mr-0.5 h-3 w-3" />
                    ) : (
                      <TrendingDown className="mr-0.5 h-3 w-3" />
                    )}
                    {Math.abs(trend)}%
                  </span>
                  <span className="text-xs text-app-text-light">
                    {trendLabel}
                  </span>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}

// Card wrapper for consistent styling
function DashboardCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default function AdminDashboardPage() {
  
  const { data: donorsData, isLoading: donorsLoading } = useGetAllDonorsQuery(
    {},
  );
  const { data: pendingData, isLoading: pendingLoading } =
    useGetPendingRequestsQuery(undefined);
  const { data: completedData, isLoading: completedLoading } =
    useGetCompletedRequestsCountQuery(undefined);

  const donorCount = donorsData?.data?.length ?? 0;
  const pendingCount = pendingData?.data?.length ?? 0;
  const completedCount = completedData?.data?.count ?? 0;
  const activeNow = pendingCount + completedCount;

  // Mock trends - replace with actual data from API if available
  const trends = {
    donors: 12,
    pending: -5,
    completed: 8,
    active: 3,
  };

  return (
  <div className="p-4 sm:p-6 lg:p-8"> 
    <div className="space-y-6">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl font-bold text-app-text">Dashboard</h1>
        <p className="text-sm text-app-text-light">
          Overview of BloodFlow activity.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Registered Donors"
          value={donorCount}
          loading={donorsLoading}
          icon={Users}
          href="/admin/users"
          trend={trends.donors}
        />
        <StatCard
          title="Open Requests"
          value={pendingCount}
          loading={pendingLoading}
          icon={Droplets}
          href="/admin/requests"
          trend={trends.pending}
        />
        <StatCard
          title="Requests Fulfilled"
          value={completedCount}
          loading={completedLoading}
          icon={CheckCircle2}
          href="/admin/requests"
          trend={trends.completed}
        />
        <StatCard
          title="Active Now"
          value={activeNow}
          loading={pendingLoading || completedLoading}
          icon={Activity}
          href="/admin/requests"
          trend={trends.active}
        />
      </div>

      {/* Charts Grid - Improved layout */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-4">
        <DashboardCard className="lg:col-span-2 2xl:col-span-2">
          <AppBarChart />
        </DashboardCard>

        <DashboardCard>
          <CardList title="Latest Contributions" />
        </DashboardCard>

        <DashboardCard>
          <AppPieChart />
        </DashboardCard>

        <DashboardCard>
          <TodoList />
        </DashboardCard>

        <DashboardCard className="lg:col-span-2 2xl:col-span-2">
          <AppAreaChart />
        </DashboardCard>

        <DashboardCard>
          <CardList title="Popular Blogs" />
        </DashboardCard>
      </div>
    </div>
  </div>  
  );
}
