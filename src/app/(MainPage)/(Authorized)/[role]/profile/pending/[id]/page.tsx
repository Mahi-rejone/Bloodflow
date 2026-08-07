"use client";
import { useParams, useRouter } from "next/navigation";
import { useGetBloodRequestByIdForPendingQuery } from "@/redux/feature/blood/bloodRequestApi";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/feature/authSlice";
import {
  Card,
  Tag,
  Spin,
  Alert,
  Button,
  Avatar,
  Modal,
  InputNumber,
  message,
} from "antd";
import {
  UserOutlined,
  ArrowLeftOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import {
  HospitalIcon,
  MapPinIcon,
  ClockIcon,
  DropletsIcon,
} from "lucide-react";

const bloodGroupLabel = (value: string) =>
  value.replace("_POS", "+").replace("_NEG", "-");

export default function RequestDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const currentUser = useAppSelector(selectCurrentUser);
  const { data, isLoading, error } = useGetBloodRequestByIdForPendingQuery(id);

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
          title="Couldn't load this request"
          description="It may have been fulfilled or removed."
          showIcon
        />
      </div>
    );
  }

  const req = data?.data;
  if (!req) return null;
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Button
        type="text"
        icon={<ArrowLeftOutlined />}
        onClick={() => router.push("/requests")}
        className="mb-4"
      >
        Back to requests
      </Button>

      <Card className="rounded-2xl border border-app-border shadow-sm">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center size-14 rounded-full bg-red-50 text-app-primary font-bold text-xl">
              {bloodGroupLabel(req.bloodGroup)}
            </span>
            <div>
              <h1 className="text-2xl font-bold text-app-text">
                {req.unitsNeeded} unit{req.unitsNeeded > 1 ? "s" : ""} needed
              </h1>
              <Tag color={req.status === "PENDING" ? "gold" : "default"}>
                {req.status}
              </Tag>
            </div>
          </div>
        </div>

        <div className="space-y-3 text-app-text mb-6">
          <p className="flex items-center gap-2">
            <HospitalIcon size={18} className="text-app-text-light" />
            {req.hospital}
          </p>
          <p className="flex items-center gap-2">
            <MapPinIcon size={18} className="text-app-text-light" />
            {req.address}, {req.town}, {req.district}, {req.state}
          </p>
          <p className="flex items-center gap-2">
            <ClockIcon size={18} className="text-app-text-light" />
            Needed by{" "}
            {new Date(req.neededAt).toLocaleString(undefined, {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>
        </div>

        <div className="border-t border-app-border pt-5">
          <p className="text-sm font-medium text-app-text-light mb-3">
            Requested by
          </p>
          <div className="flex items-center gap-3">
            <Avatar icon={<UserOutlined />} />
            <div>
              <p className="font-medium text-app-text">
                {req.requester?.fullName || req.requester?.username}
              </p>
              {req.requester?.profile?.phoneNumber && (
                <p className="text-sm text-app-text-light flex items-center gap-1">
                  <PhoneOutlined /> {req.requester.profile.phoneNumber}
                </p>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
