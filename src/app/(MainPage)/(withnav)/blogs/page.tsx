"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useGetAllBlogsQuery } from "@/redux/feature/blog/blogApi";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/feature/authSlice";
import { Card, Spin, Alert, Empty, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import EventBanner from "@/components/eventBanner";
import { usePathname } from "next/navigation";

export default function BlogsPage() {
  const pathname = usePathname();
  const currentUser = useAppSelector(selectCurrentUser);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { data, isLoading, error } = useGetAllBlogsQuery(undefined);
  const blogs = data?.data ?? [];

  const canCreate =
    mounted &&
    currentUser &&
    ["ADMIN", "BLOOD_BANK_MANAGER", "HOSPITAL_REPRESENTATIVE"].includes(
      currentUser.role,
    );

  return (
    <div className="w-full px-4 py-12 sm:px-6 lg:px-8">
      <EventBanner />
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-app-text">Blogs</h1>
          <p className="text-app-text-light mt-1">
            Stories and updates from the BloodFlow community.
          </p>
        </div>
        {canCreate && (
          <Link href={`${pathname}/new`}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              style={{ backgroundColor: "#dc2626" }}
            >
              New Blog
            </Button>
          </Link>
        )}
      </div>

      {isLoading && (
        <div className="flex justify-center py-24">
          <Spin size="large" />
        </div>
      )}
      {error && <Alert type="error" message="Couldn't load blogs" showIcon />}
      {!isLoading && !error && blogs.length === 0 && (
        <Empty description="No blogs yet" className="py-24" />
      )}

      {!isLoading && !error && blogs.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {blogs.map((blog: any) => (
            <Link key={blog.id} href={`/blogs/${blog.id}`}>
              <Card
                className="rounded-2xl border border-app-border shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full"
                cover={
                  blog.coverImage ? (
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      className="h-44 w-full object-cover rounded-t-2xl"
                    />
                  ) : undefined
                }
              >
                <h2 className="font-semibold text-app-text text-lg mb-1 line-clamp-2">
                  {blog.title}
                </h2>
                <p className="text-sm text-app-text-light line-clamp-2">
                  {blog.content}
                </p>
                <p className="text-xs text-app-text-muted mt-3">
                  By {blog.author?.fullName || blog.author?.username} ·{" "}
                  {new Date(blog.createdAt).toLocaleDateString()}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
