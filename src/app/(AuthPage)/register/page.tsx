"use client";

import { DropletsIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Input, Button, Select, DatePicker, Form, message } from "antd";
import {
  LockOutlined,
  MailFilled,
  UserOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useCreateUserMutation } from "@/redux/feature/auth/authApi";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const toBloodGroupEnum = (value: string) =>
  value.replace("+", "_POS").replace("-", "_NEG");

export default function Register() {
  const [registerUser, { isLoading }] = useCreateUserMutation();
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");

  const onFinish = async (values: any) => {
    setErrorMsg("");

    const payload = {
      username: values.username,
      fullName: values.fullName,
      email: values.email,
      password: values.password,
      role: "USER",
      profile: {
        bloodGroup: toBloodGroupEnum(values.bloodGroup),
        phoneNumber: values.phoneNumber,
        state: values.state,
        district: values.district,
        town: values.town,
        dateOfBirth: values.dateOfBirth?.toISOString(),
        gender: values.gender,
      },
    };

    try {
      await registerUser(payload).unwrap();
      router.push("/login");
    } catch (err: any) {
      setErrorMsg(err?.data?.errorMessage || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 bg-app-dark relative items-center justify-center overflow-hidden">
        <Image
          className="absolute inset-0 object-cover w-full h-full opacity-10"
          src="/assets/login_bg.png"
          alt="BloodFlow Register"
          fill
          priority
          sizes="50vw"
        />
        <div className="relative z-10 text-center px-12">
          <h2 className="text-4xl font-bold text-white mb-5">
            Join BloodFlow Today!
          </h2>
          <p className="text-white/70 text-lg max-w-md mx-auto leading-relaxed">
            Become a donor, connect with those in need, and help save lives
            through every contribution.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-app-bg">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-app-border">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <DropletsIcon className="text-app-primary" size={34} />
              <span className="text-3xl font-bold text-app-primary">
                BloodFlow
              </span>
            </Link>
            <h1 className="text-3xl font-bold text-app-text mb-2">
              Create Account
            </h1>
            <p className="text-app-text-light">
              Already have an account?
              <Link
                href="/login"
                className="ml-2 text-app-primary font-semibold hover:text-app-primary-dark hover:underline transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>

          {errorMsg && (
            <p className="text-red-500 text-sm text-center mb-4">{errorMsg}</p>
          )}

          <Form name="register" layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>

            <Form.Item
              name="fullName"
              rules={[
                { required: true, message: "Please input your Full Name!" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Full Name" />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Enter a valid email address" },
              ]}
            >
              <Input prefix={<MailFilled />} placeholder="Email Address" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
                { min: 6, message: "Password must be at least 6 characters" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item
              name="phoneNumber"
              rules={[
                { required: true, message: "Please input your Phone Number!" },
              ]}
            >
              <Input prefix={<PhoneOutlined />} placeholder="01XXXXXXXXX" />
            </Form.Item>

            <Form.Item
              name="bloodGroup"
              rules={[
                { required: true, message: "Please select your Blood Group!" },
              ]}
            >
              <Select
                placeholder="Select your blood group"
                options={BLOOD_GROUPS.map((g) => ({ value: g, label: g }))}
              />
            </Form.Item>

            <Form.Item
              name="gender"
              rules={[
                { required: true, message: "Please select your Gender!" },
              ]}
            >
              <Select
                placeholder="Select gender"
                options={[
                  { value: "Male", label: "Male" },
                  { value: "Female", label: "Female" },
                ]}
              />
            </Form.Item>

            <Form.Item
              name="dateOfBirth"
              rules={[
                {
                  required: true,
                  message: "Please select your Date of Birth!",
                },
              ]}
            >
              <DatePicker
                style={{ width: "100%" }}
                placeholder="Date of Birth"
              />
            </Form.Item>

            <Form.Item
              name="state"
              rules={[
                {
                  required: true,
                  message: "Please input your State/Division!",
                },
              ]}
            >
              <Input placeholder="e.g. Dhaka Division" />
            </Form.Item>

            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                name="district"
                rules={[{ required: true, message: "Required" }]}
              >
                <Input placeholder="District" />
              </Form.Item>

              <Form.Item
                name="town"
                rules={[{ required: true, message: "Required" }]}
              >
                <Input placeholder="Town" />
              </Form.Item>
            </div>

            <Form.Item>
              <Button
                block
                type="primary"
                htmlType="submit"
                loading={isLoading}
                style={{backgroundColor:'red'}}
              >
                Sign Up
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
