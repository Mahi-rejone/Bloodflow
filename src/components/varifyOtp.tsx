// New component: src/components/VerifyOtpModal.tsx
"use client";

import { Modal, Input, Button, message } from "antd";
import { useVerifyDonationOtpMutation } from "@/redux/feature/blood/bloodRequestApi";
import { useState } from "react";


export default function VerifyOtpModal({
  open,
  onClose,
  donationId,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  donationId: string;
  onSuccess?: () => void;
}) {
  const [otp, setOtp] = useState("");
  const [verifyOtp, { isLoading }] = useVerifyDonationOtpMutation();

  const handleSubmit = async () => {
    try {
      await verifyOtp({ donationId, otp }).unwrap();
      message.success("Donation verified — thank you!");
      setOtp("");
      onClose();
      onSuccess?.();
    } catch (err: any) {
      message.error(err?.data?.errorMessage || "Couldn't verify code");
    }
  };

  return (
    <Modal
      title="Enter the requester's code"
      open={open}
      onCancel={onClose}
      onOk={handleSubmit}
      okText="Verify"
      confirmLoading={isLoading}
    >
      <p className="text-sm text-app-text-light mb-3">
        Ask the requester for the 6-digit code they were shown after you
        pledged.
      </p>
      <Input
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="000000"
        maxLength={6}
        className="text-center text-lg font-mono tracking-widest"
      />
    </Modal>
  );
}
 