"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Card,
  message,
  Divider,
} from "antd";
import {
  UserIcon,
  MailIcon,
  LockIcon,
  ShieldIcon,
  DropletsIcon,
  MapPinIcon,
} from "lucide-react";
import { useAdminCreateUserMutation } from "@/redux/feature/user/userApi";

const ROLE_OPTIONS = [
  { value: "ADMIN", label: "Admin" },
  { value: "BLOOD_BANK_MANAGER", label: "Blood Bank Manager" },
  { value: "HOSPITAL_REPRESENTATIVE", label: "Hospital Representative" },
  { value: "USER", label: "User (Donor)" },
];

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const toBloodGroupEnum = (value: string) =>
  value.replace("+", "_POS").replace("-", "_NEG");

export default function CreateUserPage() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [adminCreateUser, { isLoading }] = useAdminCreateUserMutation();
  const [selectedRole, setSelectedRole] = useState<string | undefined>();

  const onFinish = async (values: any) => {
    const payload: any = {
      username: values.username,
      email: values.email,
      password: values.password,
      role: values.role,
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
      await adminCreateUser(payload).unwrap();
      message.success("User created successfully");
      router.push("/admin/users");
    } catch (err: any) {
      message.error(err?.data?.errorMessage || "Couldn't create user");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-app-text">Create User</h1>
        <p className="text-app-text-light mt-1">
          Add a new admin, blood bank manager, hospital representative, or donor
          account.
        </p>
      </div>

      <Card className="rounded-2xl border border-app-border shadow-sm">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onValuesChange={(changed) => {
            if (changed.role) setSelectedRole(changed.role);
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <UserIcon size={18} className="text-app-primary" />
            <h2 className="font-semibold text-app-text">Account Details</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
            <Form.Item
              name="username"
              label="Username"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input placeholder="jsmith" size="large" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Required" },
                { type: "email", message: "Enter a valid email" },
              ]}
            >
              <Input
                prefix={<MailIcon size={15} className="text-app-text-muted" />}
                placeholder="jsmith@example.com"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Required" },
                { min: 8, message: "At least 8 characters" },
              ]}
            >
              <Input.Password
                prefix={<LockIcon size={15} className="text-app-text-muted" />}
                placeholder="••••••••"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="role"
              label="Role"
              rules={[{ required: true, message: "Required" }]}
            >
              <Select
                placeholder="Select a role"
                size="large"
                options={ROLE_OPTIONS}
                suffixIcon={<ShieldIcon size={15} />}
              />
            </Form.Item>
          </div>

          <Divider />

          <div className="flex items-center gap-2 mb-4">
            <DropletsIcon size={18} className="text-app-primary" />
            <h2 className="font-semibold text-app-text">Profile Details</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
            <Form.Item
              name="bloodGroup"
              label="Blood Group"
              rules={[{ required: true, message: "Required" }]}
            >
              <Select
                placeholder="Select blood group"
                size="large"
                options={BLOOD_GROUPS.map((g) => ({ value: g, label: g }))}
              />
            </Form.Item>

            <Form.Item
              name="gender"
              label="Gender"
              rules={[{ required: true, message: "Required" }]}
            >
              <Select
                placeholder="Select gender"
                size="large"
                options={[
                  { value: "MALE", label: "Male" },
                  { value: "FEMALE", label: "Female" },
                  { value: "OTHER", label: "Other" },
                ]}
              />
            </Form.Item>

            <Form.Item
              name="phoneNumber"
              label="Phone Number"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input placeholder="01XXXXXXXXX" size="large" />
            </Form.Item>

            <Form.Item
              name="dateOfBirth"
              label="Date of Birth"
              rules={[{ required: true, message: "Required" }]}
            >
              <DatePicker style={{ width: "100%" }} size="large" />
            </Form.Item>

            <Form.Item
              name="state"
              label="State / Division"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input
                prefix={
                  <MapPinIcon size={15} className="text-app-text-muted" />
                }
                placeholder="Dhaka Division"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="district"
              label="District"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input placeholder="Dhaka" size="large" />
            </Form.Item>

            <Form.Item
              name="town"
              label="Town / Area"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input placeholder="Mirpur" size="large" />
            </Form.Item>
          </div>

          <Form.Item className="mb-0 mt-2">
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              size="large"
              style={{ backgroundColor: "#dc2626" }}
            >
              Create User
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
