"use client";

import { useGetMyMoneyDonationsQuery } from "@/redux/feature/donation/donationApi";
import { Table, Tag, Spin, Alert, Empty } from "antd";

const STATUS_COLOR: Record<string, string> = {
  SUCCESS: "green",
  PENDING: "gold",
  FAILED: "red",
  CANCELLED: "default",
};

export default function DonationHistoryPage() {
  const { data, isLoading, error } = useGetMyMoneyDonationsQuery();
  const donations = data?.data ?? [];

  const columns = [
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (d: string) => new Date(d).toLocaleString(),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amt: number, record: any) => `${amt} ${record.currency}`,
    },
    {
      title: "Transaction ID",
      dataIndex: "tranId",
      key: "transactionId",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={STATUS_COLOR[status] || "default"}>{status}</Tag>
      ),
    },
  ];

  return (
    <div className="w-full px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-app-text mb-2">My Donations</h1>
      <p className="text-sm text-app-text-light mb-8">
        A record of your monetary contributions to BloodFlow.
      </p>

      {isLoading && (
        <div className="flex justify-center py-24">
          <Spin size="large" />
        </div>
      )}

      {error && (
        <Alert type="error" title="Couldn't load your donations" showIcon />
      )}

      {!isLoading && !error && donations.length === 0 && (
        <Empty description="No donations yet" className="py-24" />
      )}

      {!isLoading && !error && donations.length > 0 && (
        <Table dataSource={donations} columns={columns} rowKey="id" />
      )}
    </div>
  );
}
