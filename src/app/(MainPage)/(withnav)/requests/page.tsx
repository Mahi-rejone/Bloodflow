"use client";

import { useState } from "react";
import { useGetPendingRequestsQuery } from "@/redux/feature/blood/bloodRequestApi";
import { useGetAllDonorsQuery } from "@/redux/feature/user/userApi";
import { useNotifyDonorsMutation } from "@/redux/feature/notification/notificationApi";
import { Card, Tag, Spin, Alert, Empty, Select, Input, Button, Modal, message } from "antd";
import {
  DropletsIcon,
  HospitalIcon,
  MapPinIcon,
  ClockIcon,
} from "lucide-react";
import { BellIcon } from "lucide-react";
import Link from "next/link";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const bloodGroupLabel = (value: string) =>
  value.replace("_POS", "+").replace("_NEG", "-");

const toBloodGroupEnum = (value: string) =>
  value.replace("+", "_POS").replace("-", "_NEG");

const urgencyTag = (neededAt: string) => {
  const hoursLeft =
    (new Date(neededAt).getTime() - Date.now()) / (1000 * 60 * 60);
  if (hoursLeft < 0) return <Tag color="default">Overdue</Tag>;
  if (hoursLeft <= 24) return <Tag color="red">Urgent · within 24h</Tag>;
  if (hoursLeft <= 72) return <Tag color="orange">Soon · within 3 days</Tag>;
  return <Tag color="green">Upcoming</Tag>;
};

export default function PendingRequestsPage() {
  const [filter, setFilter] = useState<string | undefined>(undefined);
  const [town, setTown] = useState("");
  const [notifyModalOpen, setNotifyModalOpen] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState("");

  const { data, isLoading, error } = useGetPendingRequestsQuery(undefined);
  const [notifyDonors, { isLoading: isNotifying }] = useNotifyDonorsMutation();

  const requests = data?.data ?? [];
  const filtered = filter
    ? requests.filter((r: any) => r.bloodGroup === toBloodGroupEnum(filter))
    : requests;

  const canNotify = Boolean(filter && town.trim());

  // Only fetch matching donors once both filters are set and the modal is opened
  const { data: donorsData, isFetching: donorsLoading } = useGetAllDonorsQuery(
    { bloodGroup: filter ? toBloodGroupEnum(filter) : undefined, town: town.trim() || undefined },
    { skip: !notifyModalOpen },
  );
  const matchingDonors = donorsData?.data ?? [];

  const openNotifyModal = () => {
    setNotifyMessage(
      `Urgent: ${filter} blood is needed in ${town}. Please reach out if you're able to help.`,
    );
    setNotifyModalOpen(true);
  };

  const handleSendNotification = async () => {
    if (matchingDonors.length === 0) {
      message.warning("No matching donors found for this blood group and town.");
      return;
    }
    try {
      await notifyDonors({
        message: notifyMessage,
        donorIds: matchingDonors.map((d: any) => d.id),
      }).unwrap();
      message.success(`Notified ${matchingDonors.length} donor(s)`);
      setNotifyModalOpen(false);
    } catch (err: any) {
      message.error(err?.data?.errorMessage || "Couldn't send notification");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-app-text">Blood Requests</h1>
          <p className="text-app-text-light mt-1">
            Open requests waiting for a matching donor.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Select
            allowClear
            placeholder="Filter by blood group"
            style={{ width: 200 }}
            value={filter}
            onChange={setFilter}
            options={BLOOD_GROUPS.map((g) => ({ value: g, label: g }))}
          />
          <Input
            placeholder="Town (e.g. Mirpur)"
            value={town}
            onChange={(e) => setTown(e.target.value)}
            style={{ width: 180 }}
          />
          {canNotify && (
            <Button
              icon={<BellIcon size={14} />}
              onClick={openNotifyModal}
              style={{ backgroundColor: "#dc2626", color: "white", border: "none" }}
            >
              Notify Donors
            </Button>
          )}
        </div>
      </div>

      {isLoading && (
        <div className="flex justify-center py-24">
          <Spin size="large" />
        </div>
      )}

      {error && (
        <Alert
          type="error"
          message="Couldn't load blood requests"
          description="Please try refreshing the page."
          showIcon
        />
      )}

      {!isLoading && !error && filtered.length === 0 && (
        <Empty description="No pending requests right now" className="py-24" />
      )}

      {!isLoading && !error && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {filtered.map((req: any) => (
            <Card
              key={req.id}
              className="rounded-2xl border border-app-border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="flex items-center justify-center size-10 rounded-full bg-red-50 text-app-primary font-bold">
                    {bloodGroupLabel(req.bloodGroup)}
                  </span>
                  <div>
                    <p className="font-semibold text-app-text">
                      {req.unitsNeeded} unit{req.unitsNeeded > 1 ? "s" : ""}{" "}
                      needed
                    </p>
                    <p className="text-sm text-app-text-light">
                      by {req.requester?.fullName || req.requester?.username}
                    </p>
                  </div>
                </div>
                {urgencyTag(req.neededAt)}
              </div>

              <div className="space-y-1.5 text-sm text-app-text-light mb-4">
                <p className="flex items-center gap-2">
                  <HospitalIcon size={15} /> {req.hospital}
                </p>
                <p className="flex items-center gap-2">
                  <MapPinIcon size={15} /> {req.town}, {req.district}
                </p>
                <p className="flex items-center gap-2">
                  <ClockIcon size={15} />
                  Needed by{" "}
                  {new Date(req.neededAt).toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              </div>

              <Link
                href={`/requests/${req.id}`}
                className="text-app-primary font-medium text-sm hover:underline"
              >
                View details →
              </Link>
            </Card>
          ))}
        </div>
      )}

      <Modal
        title="Notify matching donors"
        open={notifyModalOpen}
        onCancel={() => setNotifyModalOpen(false)}
        onOk={handleSendNotification}
        okText="Send"
        confirmLoading={isNotifying}
      >
        <p className="text-sm text-app-text-light mb-2">
          {donorsLoading
            ? "Finding matching donors..."
            : `This will notify ${matchingDonors.length} donor(s) with ${filter} blood in ${town}.`}
        </p>
        <Input.TextArea
          rows={4}
          value={notifyMessage}
          onChange={(e) => setNotifyMessage(e.target.value)}
        />
      </Modal>
    </div>
  );
}