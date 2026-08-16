"use client";

import { useParams, useRouter } from "next/navigation";
import {
  Card,
  Descriptions,
  Tag,
  Button,
  Popconfirm,
  message,
  Spin,
  Alert,
  Avatar,
  Switch,
  Select,
} from "antd";
import { DeleteOutlined, UserOutlined } from "@ant-design/icons";
import {
  useGetSingleUserQuery,
  useDeleteUserMutation,
  useUpdateUserByAdminMutation,
} from "@/redux/feature/user/userApi";

const ROLE_LABEL: Record<string, string> = {
  ADMIN: "Admin",
  BLOOD_BANK_MANAGER: "Blood Bank Manager",
  HOSPITAL_REPRESENTATIVE: "Hospital Representative",
  USER: "User",
};

const ROLE_COLOR: Record<string, string> = {
  ADMIN: "red",
  BLOOD_BANK_MANAGER: "geekblue",
  HOSPITAL_REPRESENTATIVE: "purple",
  USER: "default",
};

export default function UserDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data, isLoading, error } = useGetSingleUserQuery(id);
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [updateUserByAdmin, { isLoading: isUpdating }] =
    useUpdateUserByAdminMutation();

  const handleDelete = async () => {
    try {
      await deleteUser(id).unwrap();
      message.success("User deleted");
      router.push("/admin/users");
    } catch (err: any) {
      message.error(err?.data?.errorMessage || "Couldn't delete user");
    }
  };

  const handleStatusChange = async (status: "ACTIVE" | "BLOCK") => {
    try {
      await updateUserByAdmin({ id, status }).unwrap();
      message.success("Status updated");
    } catch (err: any) {
      message.error(err?.data?.errorMessage || "Couldn't update status");
    }
  };

  const handleVerifiedToggle = async (isVerified: boolean) => {
    try {
      await updateUserByAdmin({ id, isVerified }).unwrap();
      message.success(isVerified ? "User verified" : "Verification revoked");
    } catch (err: any) {
      message.error(err?.data?.errorMessage || "Couldn't update verification");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-2xl mx-auto mt-12 px-4">
        <Alert type="error" message="Couldn't load this user" showIcon />
      </div>
    );
  }

  const user = data?.data;
  if (!user) return null;

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-app-text">User Details</h1>
        <Popconfirm
          title="Delete this user?"
          description="This action can't be undone."
          okText="Delete"
          okButtonProps={{ danger: true, loading: isDeleting }}
          cancelText="Cancel"
          onConfirm={handleDelete}
        >
          <Button danger icon={<DeleteOutlined />} loading={isDeleting}>
            Delete
          </Button>
        </Popconfirm>
      </div>

      <Card className="rounded-2xl border border-app-border shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <Avatar size={64} icon={<UserOutlined />} />
          <div>
            <h2 className="text-xl font-semibold text-app-text">
              {user.fullName || user.username}
            </h2>
            <Tag color={ROLE_COLOR[user.role]} className="mt-1">
              {ROLE_LABEL[user.role]}
            </Tag>
          </div>
        </div>

        <Descriptions column={1} bordered size="small">
          <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
          <Descriptions.Item label="Username">
            {user.username}
          </Descriptions.Item>
          <Descriptions.Item label="Verified">
            <Switch
              checked={user.isVerified}
              onChange={handleVerifiedToggle}
              loading={isUpdating}
            />
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            <Select
              value={user.status as "ACTIVE" | "BLOCK"}
              onChange={handleStatusChange}
              loading={isUpdating}
              style={{ width: 140 }}
              options={[
                { value: "ACTIVE", label: "Active" },
                { value: "BLOCK", label: "Blocked" },
              ]}
            />
          </Descriptions.Item>
          {user.profile?.bloodGroup && (
            <Descriptions.Item label="Blood Group">
              {user.profile.bloodGroup}
            </Descriptions.Item>
          )}
          {user.profile?.phoneNumber && (
            <Descriptions.Item label="Phone">
              {user.profile.phoneNumber}
            </Descriptions.Item>
          )}
          {user.profile?.district && (
            <Descriptions.Item label="Location">
              {[user.profile.town, user.profile.district, user.profile.state]
                .filter(Boolean)
                .join(", ")}
            </Descriptions.Item>
          )}
          <Descriptions.Item label="Joined">
            {new Date(user.createdAt).toLocaleDateString()}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
}
