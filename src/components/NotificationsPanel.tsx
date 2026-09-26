// src/components/NotificationsPanel.tsx
"use client";

import { Drawer, Empty, Spin, Button } from "antd";
import {
  useGetMyNotificationsQuery,
  useMarkAsReadMutation,
  useMarkAllAsReadMutation,
} from "@/redux/feature/notification/notificationApi";
import { useRouter } from "next/navigation";

export default function NotificationsPanel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();

  const { data, isLoading } = useGetMyNotificationsQuery(undefined, {
    skip: !open,
  });

  const [markAsRead] = useMarkAsReadMutation();
  const [markAllAsRead] = useMarkAllAsReadMutation();

  const notifications = data?.data ?? [];

  const handleAction = async (notification: any) => {
    if (!notification.isRead) {
      await markAsRead(notification.id);
    }

    const destination =
      notification.link ||
      (notification.createdBy?.id
        ? `/donors/${notification.createdBy.id}`
        : null);

    if (destination) {
      router.push(destination);
      onClose();
    }
  };

  return (
    <Drawer
      title="Notifications"
      open={open}
      onClose={onClose}
      extra={
        <Button size="small" onClick={() => markAllAsRead(undefined)}>
          Mark all read
        </Button>
      }
    >
      {isLoading && (
        <div className="flex justify-center py-5">
          <Spin />
        </div>
      )}

      {!isLoading && notifications.length === 0 && (
        <Empty description="No notifications yet" />
      )}

      <div className="space-y-3">
        {notifications.map((n: any) => {
          const hasAction = Boolean(n.link || n.createdBy?.id);

          return (
            <div
              key={n.id}
              className={`rounded-lg border border-app-border p-3 text-sm ${
                n.isRead
                  ? "bg-app-white text-app-text-light"
                  : "bg-red-50 font-medium text-app-text"
              }`}
            >
              <p>{n.message}</p>

              {n.createdBy && (
                <p className="mt-2 text-xs text-app-text-muted">
                  From:{" "}
                  <span className="font-medium">
                    {n.createdBy.fullName || n.createdBy.username}
                  </span>
                </p>
              )}

              <p className="mt-1 text-xs text-app-text-muted">
                {new Date(n.createdAt).toLocaleString()}
              </p>

              {hasAction && (
                <Button
                  type="primary"
                  size="small"
                  className="mt-3"
                  onClick={() => handleAction(n)}
                >
                  {n.link ? "View" : "View Profile"}
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </Drawer>
  );
}
