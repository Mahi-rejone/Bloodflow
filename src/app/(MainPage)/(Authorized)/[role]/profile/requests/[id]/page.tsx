"use client";

import { useParams, useRouter } from "next/navigation";
import { useGetMyRequestByIdQuery } from "@/redux/feature/blood/bloodRequestApi";
import { Card, Tag, Spin, Alert, Button, Avatar, Progress, Empty } from "antd";
import {
  ArrowLeftOutlined,
  UserOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { HospitalIcon, MapPinIcon, ClockIcon } from "lucide-react";

const bloodGroupLabel = (value?: string) =>
  value ? value.replace("_POS", "+").replace("_NEG", "-") : "-";

export default function RequestDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data, isLoading, error } = useGetMyRequestByIdQuery(id, {
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
      <div className="max-w-3xl mx-auto mt-10">
        <Alert type="error" showIcon message="Couldn't load request." />
      </div>
    );
  }

  const request = data?.data;

  if (!request) return null;

  const donatedUnits = request.donationHistory.reduce(
    (sum: number, donation: any) => {
      return donation.status === "CONFIRMED" ? sum + donation.unitDonated : sum;
    },
    0,
  );

  const percentage =
    request.unitsNeeded > 0 ? (donatedUnits / request.unitsNeeded) * 100 : 0;

  const statusColor =
    request.status === "PENDING"
      ? "gold"
      : request.status === "IN_PROGRESS"
        ? "blue"
        : "green";

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Button
        icon={<ArrowLeftOutlined />}
        type="text"
        className="mb-5"
        onClick={() => router.back()}
      >
        Back
      </Button>

      <Card className="rounded-2xl">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex gap-4">
            <div className="size-16 rounded-full bg-red-50 flex items-center justify-center text-2xl font-bold text-red-600">
              {bloodGroupLabel(request.bloodGroup)}
            </div>

            <div>
              <h1 className="text-2xl font-bold">
                {request.unitsNeeded} Unit
                {request.unitsNeeded > 1 ? "s" : ""} Needed
              </h1>

              <Tag color={statusColor}>{request.status}</Tag>
            </div>
          </div>
        </div>

        {/* Hospital */}
        <div className="mt-8 space-y-4">
          <p className="flex gap-2 items-center">
            <HospitalIcon size={18} />
            {request.hospital}
          </p>

          <p className="flex gap-2 items-center">
            <MapPinIcon size={18} />
            {request.address}, {request.town}, {request.district},{" "}
            {request.state}
          </p>

          <p className="flex gap-2 items-center">
            <ClockIcon size={18} />
            Needed by {new Date(request.neededAt).toLocaleString()}
          </p>
        </div>

        {/* Progress */}
        <div className="mt-8">
          <div className="flex justify-between mb-2">
            <span className="font-medium">Collected Blood</span>

            <span>
              {donatedUnits} / {request.unitsNeeded} Units
            </span>
          </div>

          <Progress percent={Math.round(percentage)} strokeColor="#dc2626" />
        </div>

        {/* Donors */}
        <div className="border-t mt-8 pt-6">
          <h2 className="font-semibold mb-5">
            Donors ({request.donationHistory.length})
          </h2>

          {request.donationHistory.length === 0 ? (
            <Empty description="No donors yet" />
          ) : (
            <div className="space-y-4">
              {request.donationHistory.map((donation: any) => (
                <Card key={donation.id} size="small">
                  <div className="flex justify-between">
                    <div className="flex gap-3">
                      <Avatar icon={<UserOutlined />} />

                      <div>
                        <p className="font-semibold">
                          {donation.donor.fullName}
                        </p>

                        <p className="text-gray-500 text-sm">
                          @{donation.donor.username}
                        </p>

                        {donation.donor.profile?.phoneNumber && (
                          <p className="flex items-center gap-1 text-sm mt-1">
                            <PhoneOutlined />
                            {donation.donor.profile.phoneNumber}
                          </p>
                        )}

                        {donation.donor.profile?.bloodGroup && (
                          <p className="text-sm">
                            Blood Group:{" "}
                            {bloodGroupLabel(donation.donor.profile.bloodGroup)}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <Tag
                        color={
                          donation.status === "COMPLETED"
                            ? "green"
                            : donation.status === "IN_PROGRESS"
                              ? "blue"
                              : "gold"
                        }
                      >
                        {donation.status}
                      </Tag>

                      <p className="text-sm mt-2">
                        {donation.unitDonated} Unit
                      </p>

                      <p className="text-xs text-gray-500">
                        {new Date(donation.donationDate).toLocaleDateString()}
                      </p>
                      {donation.otp && donation.status === "IN_PROGRESS" && (
                        <p>
                          <strong>OTP:</strong>{" "}
                          <span className="text-lg font-bold tracking-widest text-red-600">
                            {donation.otp}
                          </span>
                        </p>
                      )}

                      {donation.otpExpiresAt &&
                        donation.status === "IN_PROGRESS" && (
                          <p>
                            <strong>OTP Expires:</strong>{" "}
                            {new Date(donation.otpExpiresAt).toLocaleString(
                              undefined,
                              {
                                dateStyle: "medium",
                                timeStyle: "short",
                              },
                            )}
                          </p>
                        )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
