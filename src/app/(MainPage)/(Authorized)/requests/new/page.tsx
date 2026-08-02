"use client";

import { DropletsIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Input, Button, Select, DatePicker, InputNumber, Form } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useCreateBloodRequestMutation } from "@/redux/feature/blood/bloodRequestApi";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const toBloodGroupEnum = (value: string) =>
  value.replace("+", "_POS").replace("-", "_NEG");

export default function RequestBlood() {
  const [createBloodRequest, { isLoading }] = useCreateBloodRequestMutation();
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");

  const onFinish = async (values: any) => {
    setErrorMsg("");

    const payload = {
      bloodGroup: toBloodGroupEnum(values.bloodGroup),
      unitsNeeded: values.unitsNeeded,
      hospital: values.hospital,
      state: values.state,
      district: values.district,
      town: values.town,
      address: values.address,
      neededAt: values.neededAt?.toISOString(),
    };

    try {
      await createBloodRequest(payload).unwrap();
      router.push("/requests");
    } catch (err: any) {
      setErrorMsg(err?.data?.errorMessage || "Failed to submit request");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 bg-app-dark relative items-center justify-center overflow-hidden">
        <Image
          className="absolute inset-0 object-cover w-full h-full opacity-10"
          src="/assets/login_bg.png"
          alt="BloodFlow Request"
          fill
          priority
          sizes="50vw"
        />
        <div className="relative z-10 text-center px-12">
          <h2 className="text-4xl font-bold text-white mb-5">
            Every Request Matters
          </h2>
          <p className="text-white/70 text-lg max-w-md mx-auto leading-relaxed">
            Tell us what's needed and we'll connect you with nearby donors as
            fast as possible.
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
              Request Blood
            </h1>
            <p className="text-app-text-light">
              Fill in the details and we'll notify matching donors nearby.
            </p>
          </div>

          {errorMsg && (
            <p className="text-red-500 text-sm text-center mb-4">{errorMsg}</p>
          )}

          <Form name="request_blood" layout="vertical" onFinish={onFinish}>
            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                name="bloodGroup"
                rules={[{ required: true, message: "Required" }]}
              >
                <Select
                  placeholder="Blood group"
                  options={BLOOD_GROUPS.map((g) => ({ value: g, label: g }))}
                />
              </Form.Item>

              <Form.Item
                name="unitsNeeded"
                rules={[{ required: true, message: "Required" }]}
              >
                <InputNumber
                  min={1}
                  style={{ width: "100%" }}
                  placeholder="Units needed"
                />
              </Form.Item>
            </div>

            <Form.Item
              name="hospital"
              rules={[
                { required: true, message: "Please input the hospital name!" },
              ]}
            >
              <Input prefix={<HomeOutlined />} placeholder="Hospital Name" />
            </Form.Item>

            <Form.Item
              name="neededAt"
              rules={[
                {
                  required: true,
                  message: "Please select when blood is needed by!",
                },
              ]}
            >
              <DatePicker
                showTime={{ format: "HH" }}
                format="YYYY-MM-DD HH:00"
                style={{ width: "100%" }}
                placeholder="Needed by"
              />
            </Form.Item>

            <Form.Item
              name="state"
              rules={[
                { required: true, message: "Please input State/Division!" },
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

            <Form.Item
              name="address"
              rules={[
                { required: true, message: "Please input the full address!" },
              ]}
            >
              <Input.TextArea
                rows={2}
                placeholder="Full hospital/ward address"
              />
            </Form.Item>

            <Form.Item>
              <Button
                block
                type="primary"
                htmlType="submit"
                loading={isLoading}
                style={{ backgroundColor: "#dc2626" }}
              >
                Submit Request
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
