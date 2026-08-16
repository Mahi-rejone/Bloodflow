"use client";

import { useLoginMutation } from "@/redux/feature/auth/authApi";
import { setCredentials, TUser } from "@/redux/feature/authSlice";
import { decodeToken } from "@/utils/decodeJwt";
import { DropletsIcon, LockIcon, MailIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { Button, Form, Input } from "antd";

interface LoginFormValues {
  email: string;
  password: string;
}

export default function Login() {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const [login] = useLoginMutation();

  const handleVerifyEmail = async (email: string) => {
    const result = await Swal.fire({
      title: "Please confirm your email address",
      icon: "info",
      confirmButtonText: "Verify Now",
      cancelButtonText: "Cancel",
      showCancelButton: true,
      showCloseButton: true,
    });

    if (result.isConfirmed) {
      localStorage.setItem("verifyEmail", email);
      router.push("/verify");
    }
  };

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      setLoading(true);

      const { email, password } = values;

      const result = await login({
        email,
        password,
      }).unwrap();

      if (!result.success) {
        throw new Error("Login failed. Please try again.");
      }

      // Create server-side session
      const sessionResponse = await fetch("/api/auth/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: result.data,
        }),
      });

      if (!sessionResponse.ok) {
        throw new Error("Failed to create authentication session.");
      }

      // Decode JWT
      // decodeToken returns JwtPayload, so we explicitly tell
      // TypeScript that our JWT contains the TUser properties.
      const userData = decodeToken(result.data) as TUser | null;

      if (!userData) {
        throw new Error("Invalid authentication token.");
      }

      // Save user credentials in Redux
      dispatch(
        setCredentials({
          user: {
            id: userData.id,
            email: userData.email,
            role: userData.role,
            username: userData.username,
          },
          accessToken: result.data,
        }),
      );

      // Success message
      await Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Successfully Logged In.",
        showConfirmButton: false,
        timer: 1500,
      });

      router.push("/");
    } catch (error: unknown) {
      const err = error as {
        data?: {
          errorMessage?: string;
        };
        message?: string;
      };

      const errorMessage =
        err?.data?.errorMessage ||
        err?.message ||
        "Something went wrong. Please try again.";

      // Email verification required
      if (errorMessage === "Please verify your email before logging in") {
        await handleVerifyEmail(values.email);
        return;
      }

      // Other errors
      await Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* =========================
          LEFT SIDE
      ========================== */}
      <div className="hidden lg:flex lg:w-1/2 bg-app-dark relative items-center justify-center overflow-hidden">
        <Image
          className="absolute inset-0 object-cover w-full h-full opacity-10"
          src="/assets/login_bg.png"
          alt="BloodFlow Login"
          fill
          priority
          sizes="50vw"
        />

        <div className="relative z-10 text-center px-12">
          <h2 className="text-4xl font-bold text-white mb-5">
            Welcome Back to BloodFlow!
          </h2>

          <p className="text-white/70 text-lg max-w-md mx-auto leading-relaxed">
            Connecting donors with patients and helping save lives through every
            donation.
          </p>
        </div>
      </div>

      {/* =========================
          RIGHT SIDE
      ========================== */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-app-bg">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-app-border">
          {/* =========================
              LOGO
          ========================== */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <DropletsIcon className="text-app-primary" size={34} />

              <span className="text-3xl font-bold text-app-primary">
                BloodFlow
              </span>
            </Link>

            <h1 className="text-3xl font-bold text-app-text mb-2">Sign In</h1>

            <p className="text-app-text-light">
              New Here?
              <Link
                href="/register"
                className="ml-2 text-app-primary font-semibold hover:text-app-primary-dark hover:underline transition-colors"
              >
                Create one
              </Link>
            </p>
          </div>

          {/* =========================
              ANT DESIGN FORM
          ========================== */}
          <Form<LoginFormValues>
            layout="vertical"
            onFinish={handleSubmit}
            requiredMark={false}
            autoComplete="off"
          >
            {/* =========================
                EMAIL
            ========================== */}
            <Form.Item
              label={
                <span className="text-sm font-medium text-app-text">
                  Email Address
                </span>
              }
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please enter your email address",
                },
                {
                  type: "email",
                  message: "Please enter a valid email address",
                },
              ]}
            >
              <Input
                size="large"
                prefix={
                  <MailIcon size={20} className="text-app-text-light mr-1" />
                }
                placeholder="you@example.com"
                className="!rounded-lg"
              />
            </Form.Item>

            {/* =========================
                PASSWORD
            ========================== */}
            <Form.Item
              label={
                <span className="text-sm font-medium text-app-text">
                  Password
                </span>
              }
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter your password",
                },
              ]}
            >
              <Input.Password
                size="large"
                prefix={
                  <LockIcon size={20} className="text-app-text-light mr-1" />
                }
                placeholder="Enter your password"
                className="!rounded-lg"
              />
            </Form.Item>

            {/* =========================
                FORGOT PASSWORD
            ========================== */}
            <div className="flex justify-end -mt-2 mb-5">
              <Link
                href="/forgot-password"
                className="text-sm text-app-primary hover:text-app-primary-dark hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* =========================
                SUBMIT BUTTON
            ========================== */}
            <Form.Item className="!mb-0">
              <Button
                htmlType="submit"
                type="primary"
                size="large"
                loading={loading}
                block
                className="!h-12 !rounded-lg !font-semibold !bg-app-primary hover:!bg-app-primary-dark"
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
