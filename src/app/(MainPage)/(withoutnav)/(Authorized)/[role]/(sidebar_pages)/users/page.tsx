"use client";

import { useMemo } from "react";
import { Table, Tag, Alert, Empty, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useGetAllUsersQuery, UserItem } from "@/redux/feature/user/userApi";
import { useRouter } from "next/navigation";

const ROLE_ORDER: Record<UserItem["role"], number> = {
  ADMIN: 0,
  BLOOD_BANK_MANAGER: 1,
  HOSPITAL_REPRESENTATIVE: 2,
  USER: 3,
};

const ROLE_LABEL: Record<UserItem["role"], string> = {
  ADMIN: "Admin",
  BLOOD_BANK_MANAGER: "Blood Bank Manager",
  HOSPITAL_REPRESENTATIVE: "Hospital Representative",
  USER: "User",
};

const ROLE_COLOR: Record<UserItem["role"], string> = {
  ADMIN: "red",
  BLOOD_BANK_MANAGER: "geekblue",
  HOSPITAL_REPRESENTATIVE: "purple",
  USER: "default",
};

export default function UsersPage() {
  const router = useRouter();

  const { data, isLoading, error } = useGetAllUsersQuery();
  const users = data?.data ?? [];

  const sortedUsers = useMemo(
    () => [...users].sort((a, b) => ROLE_ORDER[a.role] - ROLE_ORDER[b.role]),
    [users],
  );

  const columns: ColumnsType<UserItem> = [
    {
      title: "",
      key: "avatar",
      width: 56,
      render: () => <Avatar icon={<UserOutlined />} />,
    },
    {
      title: "Name",
      key: "name",
      render: (_, user) => (
        <span className="font-semibold text-app-text">
          {user.fullName || user.username}
        </span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      responsive: ["md"],
      render: (email: string) => (
        <span className="text-app-text-light">{email}</span>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: 220,
      render: (role: UserItem["role"]) => (
        <Tag color={ROLE_COLOR[role]}>{ROLE_LABEL[role]}</Tag>
      ),
      // keep the same admin-first ordering if the user clicks the column header
      sorter: (a, b) => ROLE_ORDER[a.role] - ROLE_ORDER[b.role],
      defaultSortOrder: "ascend",
    },
    {
      title: "Blood Group",
      key: "bloodGroup",
      width: 120,
      responsive: ["lg"],
      render: (_, user) => user.profile?.bloodGroup || "—",
    },
    {
      title: "Joined",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 140,
      responsive: ["lg"],
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
  ];

  return (
    <div className="w-full px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-app-text">All Users</h1>
        <p className="text-app-text-light mt-1">
          Admins, blood bank managers, and hospital representatives first.
        </p>
      </div>

      {error && <Alert type="error" title="Couldn't load users" showIcon />}

      {!error && (
        <Table<UserItem>
          rowKey="id"
          columns={columns}
          dataSource={sortedUsers}
          loading={isLoading}
          locale={{
            emptyText: <Empty description="No users yet" className="py-16" />,
          }}
          pagination={{ pageSize: 15, hideOnSinglePage: true }}
          onRow={(user) => ({
            onClick: () => router.push(`/admin/users/${user.id}`),
            className: "cursor-pointer",
          })}
          className="rounded-2xl overflow-hidden border border-app-border"
        />
      )}
    </div>
  );
}
