"use client";

import { useState } from "react";
import { useGetMyMoneyDonationsQuery } from "@/redux/feature/donation/donationApi";
import { Table, Tag, Spin, Alert, Empty, Button, message } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { pdf } from "@react-pdf/renderer";
import DonationReceipt from "@/components/DonationReceipt";

const STATUS_COLOR: Record<string, string> = {
  PAID: "green",
  FAILED: "red",
};

export default function DonationHistoryPage() {
  const { data, isLoading, error } = useGetMyMoneyDonationsQuery();
  const donations = data?.data ?? [];
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownload = async (record: any) => {
    setDownloadingId(record.id);
    try {
      const blob = await pdf(
        <DonationReceipt
          data={{
            donorName: record.donorName,
            donorEmail: record.donorEmail,
            amount: record.amount,
             currency: record.currency,
            tranId: record.tranId,
            status: record.status,
            createdAt: record.createdAt,
          }}
        />,
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `BloodFlow-Receipt-${record.tranId}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch {
      message.error("Couldn't generate receipt.");
    } finally {
      setDownloadingId(null);
    }
  };

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
    {
      title: "Receipt",
      key: "receipt",
      render: (_: any, record: any) =>
        record.status === "PAID" ? (
          <Button
            size="small"
            icon={<DownloadOutlined />}
            loading={downloadingId === record.id}
            onClick={() => handleDownload(record)}
          >
            Download
          </Button>
        ) : (
          <span className="text-xs text-app-text-light">—</span>
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
