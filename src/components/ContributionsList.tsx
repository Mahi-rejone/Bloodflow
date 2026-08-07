"use client";

import { useGetContributionsForRequestQuery } from "@/redux/feature/blood/bloodRequestApi";
import { Card, Tag, Spin, Empty } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { message } from "antd";

export default function ContributionsList({
  requestId,
}: {
  requestId: string;
}) {
  const { data, isLoading } = useGetContributionsForRequestQuery(requestId);
  const contributions = data?.data ?? [];

  if (isLoading) return <Spin size="small" />;
  if (contributions.length === 0) {
    return (
      <Empty
        description="No one has pledged yet"
        className="py-6"
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      />
    );
  }

  const copyOtp = (otp: string) => {
    navigator.clipboard.writeText(otp);
    message.success("Code copied");
  };

  return (
    <div className="space-y-3">
      {contributions.map((c: any) => (
        <Card
          key={c.id}
          size="small"
          className="rounded-xl border border-app-border"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-app-text">
                {c.donor?.fullName || c.donor?.username}
              </p>
              <p className="text-xs text-app-text-light">
                Pledged {c.unitDonated} unit{c.unitDonated > 1 ? "s" : ""} ·{" "}
                {new Date(c.donationDate).toLocaleDateString()}
              </p>
            </div>

            {c.status === "COMPLETE" ? (
              <Tag color="green">Verified</Tag>
            ) : (
              <div className="text-right">
                <p className="text-xs text-app-text-light mb-1">
                  Share this code
                </p>
                <button
                  onClick={() => copyOtp(c.otp)}
                  className="flex items-center gap-1.5 font-mono text-lg font-bold text-app-primary hover:opacity-80"
                >
                  {c.otp} <CopyOutlined className="text-sm" />
                </button>
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}
