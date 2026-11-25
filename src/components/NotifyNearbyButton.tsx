"use client";

import { Button } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import { useNotifyNearby } from "@/hooks/useNotifyNearby";

export default function NotifyNearbyButton({
  bloodGroup,
  requestId,
}: {
  bloodGroup: string;
  requestId?: string;
}) {
  const { notify, loading } = useNotifyNearby();

  return (
    <Button
      icon={<EnvironmentOutlined />}
      loading={loading}
      onClick={() => notify(bloodGroup, requestId)}
    >
      Notify nearby donors
    </Button>
  );
}
