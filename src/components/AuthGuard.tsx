"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Spin } from "antd";
import { useGetMeQuery } from "@/redux/feature/user/userApi";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const { data, isLoading, isError, isSuccess } = useGetMeQuery(undefined);

  useEffect(() => {
    if (isError) {
      router.replace("/login");
    }
  }, [isError, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (isError || !isSuccess || !data) {
    return null;
  }

  return <>{children}</>;
}
