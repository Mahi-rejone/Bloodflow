"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  useGetBloodRequestByIdQuery,
  useAcceptBloodRequestMutation,
} from "@/redux/feature/blood/bloodRequestApi";
import { useGetMeQuery } from "@/redux/feature/user/userApi";
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
  const { data, isLoading, error } = useGetBloodRequestByIdQuery(id);
  const { data: meData } = useGetMeQuery(undefined, { skip: !currentUser });
  const [acceptBloodRequest, { isLoading: isAccepting }] =
    useAcceptBloodRequestMutation();

  const [modalOpen, setModalOpen] = useState(false);
  const [units, setUnits] = useState<number | null>(1);

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
          message="Couldn't load this request"
          description="It may have been fulfilled or removed."
          showIcon
        />
      </div>
    );
  }

  const req = data?.data;
  if (!req) return null;

  const myBloodGroup = meData?.data?.profile?.bloodGroup;
  const isOwnRequest = currentUser?.id === req.requester?.id;
  const isPending = req.status === "PENDING";
  const bloodGroupMatches = !!myBloodGroup && myBloodGroup === req.bloodGroup;
  const canHelp = isPending && !isOwnRequest && bloodGroupMatches;

  const handleOpenModal = () => {
    if (!currentUser) {
      router.push("/login");
      return;
    }
    setUnits(1);
    setModalOpen(true);
  };

  const handleConfirm = async () => {
    if (!units || units < 1) return;
    try {
      await acceptBloodRequest({ id, units }).unwrap();
      message.success("Thanks! Your contribution has been recorded.");
      setModalOpen(false);
    } catch (err: any) {
      message.error(
        err?.data?.errorMessage ||
          "Couldn't record your contribution. Try again.",
      );
    }
  };

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

        {isPending && !isOwnRequest && currentUser && !bloodGroupMatches && (
          <p className="mt-6 text-center text-sm text-app-text-light">
            Your blood group (
            {myBloodGroup ? bloodGroupLabel(myBloodGroup) : "unknown"}) doesn't
            match what's needed ({bloodGroupLabel(req.bloodGroup)}).
          </p>
        )}

        {canHelp && (
          <Button
            type="primary"
            block
            size="large"
            className="mt-6"
            style={{ backgroundColor: "#dc2626" }}
            onClick={handleOpenModal}
          >
            I Can Help
          </Button>
        )}

        {isOwnRequest && (
          <p className="mt-6 text-center text-sm text-app-text-light">
            This is your own request.
          </p>
        )}
      </Card>

      <Modal
        title="How many units can you give?"
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={handleConfirm}
        okText="Confirm"
        confirmLoading={isAccepting}
      >
        <p className="text-sm text-app-text-light mb-3">
          {req.unitsNeeded} unit{req.unitsNeeded > 1 ? "s" : ""} still needed
          for this request.
        </p>
        <InputNumber
          min={1}
          max={req.unitsNeeded}
          value={units}
          onChange={setUnits}
          style={{ width: "100%" }}
        />
      </Modal>
    </div>
  );
}
