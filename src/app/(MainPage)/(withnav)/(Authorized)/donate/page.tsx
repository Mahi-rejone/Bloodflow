"use client";

import { DropletsIcon, HeartIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button, Form, Input, InputNumber } from "antd";
import { useInitiateDonationMutation } from "@/redux/feature/donation/donationApi";

const PRESET_AMOUNTS = [200, 500, 1000, 2000];

interface DonationFormValues {
  amount: number;
  note?: string;
}

export default function DonatePage() {
  const [form] = Form.useForm<DonationFormValues>();
  const [initiateDonation, { isLoading }] = useInitiateDonationMutation();
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (values: DonationFormValues) => {
    setErrorMsg("");
    try {
      const result = await initiateDonation({
        amount: values.amount,
        note: values.note,
      }).unwrap();

      // SSLCommerz's gateway lives on a different domain — a full page
      // navigation is required, a Next.js router push won't work here.
      window.location.href = result.data.GatewayPageURL;
    } catch (err: any) {
      setErrorMsg(
        err?.data?.message ||
          err?.data?.errorMessage ||
          "Failed to start payment. Please try again.",
      );
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 bg-app-dark relative items-center justify-center overflow-hidden">
        <Image
          className="absolute inset-0 object-cover w-full h-full opacity-10"
          src="/assets/login_bg.png"
          alt="BloodFlow Donation"
          fill
          priority
          sizes="50vw"
        />
        <div className="relative z-10 text-center px-12">
          <h2 className="text-4xl font-bold text-white mb-5">
            Every Taka Helps Save a Life
          </h2>
          <p className="text-white/70 text-lg max-w-md mx-auto leading-relaxed">
            Your contribution helps us run donor drives, support emergency blood
            requests, and keep BloodFlow free for everyone who needs it.
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
            <h1 className="text-3xl font-bold text-app-text mb-2 flex items-center justify-center gap-2">
              <HeartIcon className="text-app-primary" size={26} />
              Make a Donation
            </h1>
            <p className="text-app-text-light">
              Support BloodFlow with a one-time contribution via SSLCommerz.
            </p>
          </div>

          <Form<DonationFormValues>
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            requiredMark={false}
            autoComplete="off"
            initialValues={{ amount: 500 }}
          >
            <Form.Item
              label={
                <span className="text-sm font-medium text-app-text">
                  Amount (BDT)
                </span>
              }
              name="amount"
              rules={[
                { required: true, message: "Please enter an amount" },
                {
                  validator: (_, value) =>
                    value >= 10
                      ? Promise.resolve()
                      : Promise.reject(new Error("Minimum donation is ৳10")),
                },
              ]}
            >
              <InputNumber<number>
                size="large"
                className="!w-full !rounded-lg"
                min={10}
                prefix="৳"
                placeholder="500"
              />
            </Form.Item>

            <div className="flex gap-2 mb-6 -mt-3">
              {PRESET_AMOUNTS.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => form.setFieldValue("amount", amt)}
                  className="flex-1 rounded-lg border border-app-border py-1.5 text-sm text-app-text hover:border-app-primary hover:text-app-primary transition"
                >
                  ৳{amt}
                </button>
              ))}
            </div>

            <Form.Item
              label={
                <span className="text-sm font-medium text-app-text">
                  Message (optional)
                </span>
              }
              name="note"
            >
              <Input.TextArea
                rows={3}
                placeholder="Say a few words..."
                className="!rounded-lg"
              />
            </Form.Item>

            {errorMsg && (
              <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                {errorMsg}
              </p>
            )}

            <Form.Item className="!mb-0">
              <Button
                htmlType="submit"
                type="primary"
                size="large"
                loading={isLoading}
                block
                className="!h-12 !rounded-lg !font-semibold !bg-app-primary hover:!bg-app-primary-dark"
              >
                {isLoading ? "Redirecting to payment..." : "Donate Now"}
              </Button>
            </Form.Item>

            <p className="mt-4 text-center text-xs text-app-text-light">
              You&rsquo;ll be redirected to SSLCommerz&rsquo;s secure payment
              page to complete your donation.
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
}
