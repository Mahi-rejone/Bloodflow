"use client";

import { useGetPendingRequestsQuery } from "@/redux/feature/blood/bloodRequestApi";
import { Card, Tag, Spin, Alert, Empty, Select } from "antd";
import {
  DropletsIcon,
  HospitalIcon,
  MapPinIcon,
  ClockIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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
  const { data, isLoading, error } = useGetPendingRequestsQuery(undefined);

  const requests = data?.data ?? [];
  const filtered = filter
    ? requests.filter((r: any) => r.bloodGroup === toBloodGroupEnum(filter))
    : requests;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-app-text">Blood Requests</h1>
          <p className="text-app-text-light mt-1">
            Open requests waiting for a matching donor.
          </p>
        </div>

        <Select
          allowClear
          placeholder="Filter by blood group"
          style={{ width: 220 }}
          value={filter}
          onChange={setFilter}
          options={BLOOD_GROUPS.map((g) => ({ value: g, label: g }))}
        />
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
    </div>
  );
}
