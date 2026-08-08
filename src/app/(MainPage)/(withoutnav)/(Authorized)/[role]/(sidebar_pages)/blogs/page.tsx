"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useGetAllBlogsQuery } from "@/redux/feature/blog/blogApi";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/feature/authSlice";
import { Table, Alert, Empty, Button, Avatar } from "antd";
import { PlusOutlined, FileImageOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";


interface Blog {
  id: string;
  title: string;
  content: string;
  coverImage?: string;
  createdAt: string;
  author?: { fullName?: string; username?: string };
}

export default function BlogsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const currentUser = useAppSelector(selectCurrentUser);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { data, isLoading, error } = useGetAllBlogsQuery(undefined);
  const blogs: Blog[] = data?.data ?? [];

  const canCreate =
    mounted &&
    currentUser &&
    ["ADMIN", "BLOOD_BANK_MANAGER", "HOSPITAL_REPRESENTATIVE"].includes(
      currentUser.role,
    );

  const columns: ColumnsType<Blog> = [
    {
      title: "",
      dataIndex: "coverImage",
      key: "coverImage",
      width: 64,
      render: (coverImage: string, blog) =>
        coverImage ? (
          <Avatar shape="square" size={48} src={coverImage} />
        ) : (
          <Avatar shape="square" size={48} icon={<FileImageOutlined />} />
        ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (title: string) => (
        <span className="font-semibold text-app-text">{title}</span>
      ),
    },
    {
      title: "Excerpt",
      dataIndex: "content",
      key: "content",
      ellipsis: true,
      render: (content: string) => (
        <span className="text-app-text-light">{content}</span>
      ),
      responsive: ["md"],
    },
    {
      title: "Author",
      key: "author",
      width: 180,
      render: (_, blog) =>
        blog.author?.fullName || blog.author?.username || "—",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 140,
      render: (createdAt: string) => new Date(createdAt).toLocaleDateString(),
      sorter: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
  ];

  return (
    <div className="w-full px-4 py-12 sm:px-6 lg:px-8">
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

      {error && <Alert type="error" message="Couldn't load blogs" showIcon />}

      {!error && (
        <Table<Blog>
          rowKey="id"
          columns={columns}
          dataSource={blogs}
          loading={isLoading}
          locale={{
            emptyText: <Empty description="No blogs yet" className="py-16" />,
          }}
          pagination={{ pageSize: 10, hideOnSinglePage: true }}
          onRow={(blog) => ({
            onClick: () => router.push(`${pathname}/${blog.id}/edit`),
            className: "cursor-pointer",
          })}
          className="rounded-2xl overflow-hidden border border-app-border"
        />
      )}
    </div>
  );
}
