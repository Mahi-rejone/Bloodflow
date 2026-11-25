"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Form, Input, Button, message, Spin } from "antd";
import { useResetPasswordMutation } from "@/redux/feature/auth/authApi";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const onFinish = async (values: { newPassword: string }) => {
    if (!token) {
      message.error("Missing reset token.");
      return;
    }
    try {
      await resetPassword({ token, newPassword: values.newPassword }).unwrap();
      message.success("Password reset. You can log in now.");
      router.push("/login");
    } catch (err: any) {
      message.error(
        err?.data?.errorMessage || "This link is invalid or expired.",
      );
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold text-app-text mb-6">Reset Password</h1>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="newPassword"
          rules={[{ required: true, min: 6, message: "At least 6 characters" }]}
        >
          <Input.Password placeholder="New password" size="large" />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          block
          loading={isLoading}
          style={{ backgroundColor: "#dc2626" }}
        >
          Reset Password
        </Button>
      </Form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <Spin size="large" />
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
