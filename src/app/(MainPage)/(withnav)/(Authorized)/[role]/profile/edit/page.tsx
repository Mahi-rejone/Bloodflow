"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Select,
  Spin,
  Alert,
  message,
} from "antd";
import { useRouter } from "next/navigation";
import {
  useGetMeQuery,
  useUpdateMyProfileMutation,
} from "@/redux/feature/user/userApi";

const BLOOD_GROUPS = [
  { value: "A_POS", label: "A+" },
  { value: "A_NEG", label: "A-" },
  { value: "B_POS", label: "B+" },
  { value: "B_NEG", label: "B-" },
  { value: "AB_POS", label: "AB+" },
  { value: "AB_NEG", label: "AB-" },
  { value: "O_POS", label: "O+" },
  { value: "O_NEG", label: "O-" },
];

const STATUS_OPTIONS = [
  {
    value: "ACTIVE",
    label: "Active",
  },
  {
    value: "BLOCK",
    label: "Blocked",
  },
];

export default function EditProfilePage() {
  const router = useRouter();

  const [form] = Form.useForm();

  const [messageApi, contextHolder] = message.useMessage();

  const { data, isLoading: isUserLoading, error } = useGetMeQuery(undefined);

  const [updateMyProfile, { isLoading: isUpdating }] =
    useUpdateMyProfileMutation();

  const user = data?.data;

  useEffect(() => {
    if (!user) return;

    form.setFieldsValue({
      fullName: user.fullName || "",
      status: user.status || "ACTIVE",

      phoneNumber: user.profile?.phoneNumber || "",

      guardianNumber: user.profile?.guardianNumber || "",

      bloodGroup: user.profile?.bloodGroup || undefined,

      state: user.profile?.state || "",

      district: user.profile?.district || "",

      town: user.profile?.town || "",

      address: user.profile?.address || "",

      img: user.profile?.img || "",

      numberOfDonation: user.profile?.numberOfDonation ?? 0,
    });
  }, [user, form]);

  if (isUserLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <Alert type="error" showIcon message="Unable to load your profile" />
      </div>
    );
  }

  const handleSubmit = async (values: any) => {
    try {
      await updateMyProfile({
        currentPassword: values.currentPassword,

        status: values.status,

        phoneNumber: values.phoneNumber,

        guardianNumber: values.guardianNumber,


        state: values.state,

        district: values.district,

        town: values.town,

        address: values.address,

        img: values.img,

      }).unwrap();

      messageApi.success("Profile updated successfully");

      form.setFieldValue("currentPassword", "");

      router.push(`/${user.role.toLowerCase()}/profile`);
    } catch (err: any) {
      messageApi.error(
        err?.data?.message ||
          err?.data?.errorMessage ||
          "Failed to update profile",
      );
    }
  };

  return (
    <>
      {contextHolder}

      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-app-text">Edit Profile</h1>

          <p className="mt-2 text-app-text-light">
            Update your profile information. Your current password is required
            to save changes.
          </p>
        </div>

        <Card className="rounded-2xl border border-app-border">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            autoComplete="off"
          >
            {/* -------------------------------- */}
            {/* ACCOUNT INFORMATION */}
            {/* -------------------------------- */}

            <div className="mb-6">
              <h2 className="mb-4 text-lg font-semibold text-app-text">
                Account Information
              </h2>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Form.Item label="Username">
                  <Input value={user.username} disabled />
                </Form.Item>

                <Form.Item label="Email">
                  <Input value={user.email} disabled />
                </Form.Item>

                <Form.Item name="status" label="Status">
                  <Select options={STATUS_OPTIONS} />
                </Form.Item>
              </div>
            </div>

            {/* -------------------------------- */}
            {/* PROFILE IMAGE */}
            {/* -------------------------------- */}

            <div className="mb-6">
              <h2 className="mb-4 text-lg font-semibold text-app-text">
                Profile Image
              </h2>

              <Form.Item name="img" label="Profile Image URL">
                <Input placeholder="https://example.com/profile.jpg" />
              </Form.Item>
            </div>

            {/* -------------------------------- */}
            {/* CONTACT INFORMATION */}
            {/* -------------------------------- */}

            <div className="mb-6">
              <h2 className="mb-4 text-lg font-semibold text-app-text">
                Contact Information
              </h2>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Form.Item
                  name="phoneNumber"
                  label="Phone Number"
                  rules={[
                    {
                      required: true,
                      message: "Phone number is required",
                    },
                  ]}
                >
                  <Input placeholder="01XXXXXXXXX" />
                </Form.Item>

                <Form.Item name="guardianNumber" label="Guardian Number">
                  <Input placeholder="Guardian phone number" />
                </Form.Item>
              </div>
            </div>

            {/* -------------------------------- */}
            {/* LOCATION */}
            {/* -------------------------------- */}

            <div className="mb-6">
              <h2 className="mb-4 text-lg font-semibold text-app-text">
                Location
              </h2>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Form.Item
                  name="state"
                  label="State / Division"
                  rules={[
                    {
                      required: true,
                      message: "State/Division is required",
                    },
                  ]}
                >
                  <Input placeholder="Dhaka Division" />
                </Form.Item>

                <Form.Item
                  name="district"
                  label="District"
                  rules={[
                    {
                      required: true,
                      message: "District is required",
                    },
                  ]}
                >
                  <Input placeholder="Gazipur" />
                </Form.Item>

                <Form.Item
                  name="town"
                  label="Town"
                  rules={[
                    {
                      required: true,
                      message: "Town is required",
                    },
                  ]}
                >
                  <Input placeholder="Tongi" />
                </Form.Item>

                <Form.Item name="address" label="Address">
                  <Input placeholder="Full address" />
                </Form.Item>
              </div>
            </div>

            {/* -------------------------------- */}
            {/* PASSWORD CONFIRMATION */}
            {/* -------------------------------- */}

            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">
              <h2 className="mb-2 text-lg font-semibold text-red-700">
                Confirm Changes
              </h2>

              <p className="mb-4 text-sm text-red-600">
                Enter your current password to confirm these profile changes.
              </p>

              <Form.Item
                name="currentPassword"
                label="Current Password"
                rules={[
                  {
                    required: true,
                    message: "Please enter your current password",
                  },
                ]}
              >
                <Input.Password placeholder="Enter your current password" />
              </Form.Item>
            </div>

            {/* -------------------------------- */}
            {/* ACTIONS */}
            {/* -------------------------------- */}

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                size="large"
                onClick={() => router.back()}
                disabled={isUpdating}
              >
                Cancel
              </Button>

              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={isUpdating}
              >
                Save Changes
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </>
  );
}
