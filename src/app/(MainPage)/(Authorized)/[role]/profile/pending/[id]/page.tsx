"use client";

import { useParams, useRouter } from "next/navigation";
import { useGetMyPendingDonationByIdQuery } from "@/redux/feature/blood/bloodRequestApi";
import { Card, Tag, Spin, Alert, Button, Avatar } from "antd";
import {
  UserOutlined,
  ArrowLeftOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { HospitalIcon, MapPinIcon, ClockIcon } from "lucide-react";

const bloodGroupLabel = (value?: string) =>
  value ? value.replace("_POS", "+").replace("_NEG", "-") : "-";

export default function RequestDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data, isLoading, error } = useGetMyPendingDonationByIdQuery(id, {
    skip: !id,
  });

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto mt-12 px-4">
        <Alert
          type="error"
          message="Couldn't load donation details"
          description="The donation may not exist or you don't have permission to view it."
          showIcon
        />
      </div>
    );
  }

  const donation = data?.data;
  const request = donation?.bloodRequest;
  const recipient = donation?.recipient;

  if (!donation || !request) return null;

  const statusColor =
    donation.status === "COMPLETED"
      ? "green"
      : donation.status === "IN_PROGRESS"
        ? "blue"
        : donation.status === "PENDING"
          ? "gold"
          : "default";

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Button
        type="text"
        icon={<ArrowLeftOutlined />}
        onClick={() => router.back()}
        className="mb-4"
      >
        Back
      </Button>

      <Card className="rounded-2xl border border-app-border shadow-sm">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center size-14 rounded-full bg-red-50 text-app-primary font-bold text-xl">
              {bloodGroupLabel(request.bloodGroup)}
            </span>

            <div>
              <h1 className="text-2xl font-bold text-app-text">
                {request.unitsNeeded} unit
                {request.unitsNeeded > 1 ? "s" : ""} needed
              </h1>

              <Tag color={statusColor}>{donation.status}</Tag>
            </div>
          </div>
        </div>

        {/* Request Details */}
        <div className="space-y-4 text-app-text mb-6">
          <p className="flex items-center gap-2">
            <HospitalIcon size={18} className="text-app-text-light" />
            {request.hospital}
          </p>

          <p className="flex items-center gap-2">
            <MapPinIcon size={18} className="text-app-text-light" />
            {request.address}, {request.town}, {request.district},{" "}
            {request.state}
          </p>

          <p className="flex items-center gap-2">
            <ClockIcon size={18} className="text-app-text-light" />
            Needed by{" "}
            {new Date(request.neededAt).toLocaleString(undefined, {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>
        </div>

        {/* Recipient */}
        <div className="border-t border-app-border pt-5">
          <p className="text-sm font-medium text-app-text-light mb-3">
            Recipient
          </p>

          <div className="flex items-center gap-3">
            <Avatar icon={<UserOutlined />} />

            <div>
              <p className="font-medium text-app-text">
                {recipient?.fullName || recipient?.username}
              </p>

              {recipient?.profile?.phoneNumber && (
                <p className="text-sm text-app-text-light flex items-center gap-1">
                  <PhoneOutlined />
                  {recipient.profile.phoneNumber}
                </p>
              )}

              {recipient?.profile?.bloodGroup && (
                <p className="text-sm text-app-text-light">
                  Blood Group:{" "}
                  <strong>
                    {bloodGroupLabel(recipient.profile.bloodGroup)}
                  </strong>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Donation Info */}
        <div className="border-t border-app-border pt-5 mt-5">
          <p className="text-sm font-medium text-app-text-light mb-3">
            Donation Information
          </p>

          <div className="space-y-2 text-sm">
            <p>
              <strong>Units Donated:</strong> {donation.unitDonated}
            </p>

            <p>
              <strong>Donation Date:</strong>{" "}
              {new Date(donation.donationDate).toLocaleString(undefined, {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              <Tag color={statusColor}>{donation.status}</Tag>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
