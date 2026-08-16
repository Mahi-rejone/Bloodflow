"use client";

import { Form, Input, Button, message } from "antd";
import { useForgotPasswordMutation } from "@/redux/feature/auth/authApi";

export default function ForgotPasswordPage() {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const onFinish = async (values: { email: string }) => {
    try {
      await forgotPassword(values).unwrap();
      message.success(
        "If that email is registered, check your inbox for a reset link.",
      );
    } catch {
      message.error("Something went wrong. Try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold text-app-text mb-2">Forgot Password</h1>
      <p className="text-sm text-app-text-light mb-6">
        Enter your email and we'll send you a reset link.
      </p>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item name="email" rules={[{ required: true, type: "email" }]}>
          <Input placeholder="you@example.com" size="large" />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          block
          loading={isLoading}
          style={{ backgroundColor: "#dc2626" }}
        >
          Send Reset Link
        </Button>
      </Form>
    </div>
  );
}
