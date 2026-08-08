// src/app/(MainPage)/events/page.tsx
"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Table, Button, Popconfirm, message, Alert, Spin, Empty } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import {
  useGetAllEventsQuery,
  useDeleteEventMutation,
} from "@/redux/feature/event/eventApi";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/feature/authSlice";
import { canModify } from "@/utils/canModify";

const STAFF_ROLES = ["ADMIN", "BLOOD_BANK_MANAGER", "HOSPITAL_REPRESENTATIVE"];

interface EventItem {
  id: string;
  title: string;
  location: string;
  eventDate: string;
  organizerId: string;
  organizer?: { fullName?: string; username?: string };
}

export default function EventsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const currentUser = useAppSelector(selectCurrentUser);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isStaff =
    mounted && currentUser && STAFF_ROLES.includes(currentUser.role);

  useEffect(() => {
    if (!mounted) return;
    if (!isStaff) {
      const timer = setTimeout(() => router.push("/"), 2000);
      return () => clearTimeout(timer);
    }
  }, [mounted, isStaff, router]);

  const { data, isLoading, error } = useGetAllEventsQuery(undefined, {
    skip: !isStaff,
  });
  const [deleteEvent, { isLoading: isDeleting }] = useDeleteEventMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteEvent(id).unwrap();
      message.success("Event deleted");
    } catch (err: any) {
      message.error(err?.data?.errorMessage || "Couldn't delete event");
    }
  };

  if (!mounted) return null;

  if (!isStaff) {
    return (
      <div className="max-w-md mx-auto mt-16 px-4">
        <Alert
          type="error"
          message="Access denied"
          description="You don't have permission to view this page. Redirecting..."
          showIcon
        />
      </div>
    );
  }

  const events: EventItem[] = data?.data ?? [];

  const columns: ColumnsType<EventItem> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (title: string) => (
        <span className="font-semibold text-app-text">{title}</span>
      ),
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      responsive: ["md"],
      render: (location: string) => (
        <span className="text-app-text-light">{location}</span>
      ),
    },
    {
      title: "Date",
      dataIndex: "eventDate",
      key: "eventDate",
      width: 200,
      render: (date: string) =>
        new Date(date).toLocaleString(undefined, {
          dateStyle: "medium",
          timeStyle: "short",
        }),
      sorter: (a, b) =>
        new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime(),
    },
    {
      title: "Organizer",
      key: "organizer",
      width: 180,
      render: (_, record) =>
        record.organizer?.fullName || record.organizer?.username || "—",
    },
    {
      title: "",
      key: "actions",
      width: 60,
      render: (_, record) => {
        const editable = canModify(currentUser, record.organizerId);
        if (!editable) return null;
        return (
          <Popconfirm
            title="Delete this event?"
            description="This can't be undone."
            onConfirm={() => handleDelete(record.id)}
            okText="Delete"
            okButtonProps={{ danger: true, loading: isDeleting }}
          >
            <Button
              size="small"
              icon={<DeleteOutlined />}
              danger
              onClick={(e) => e.stopPropagation()}
            />
          </Popconfirm>
        );
      },
    },
  ];

  return (
    <div className="w-full px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-app-text">Manage Events</h1>
          <p className="text-app-text-light mt-1">
            All events across BloodFlow.
          </p>
        </div>
        <Link href={`${pathname}/new`}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            style={{ backgroundColor: "#dc2626" }}
          >
            New Event
          </Button>
        </Link>
      </div>

      {error && <Alert type="error" title="Couldn't load events" showIcon />}

      {!error && (
        <Table<EventItem>
          rowKey="id"
          columns={columns}
          dataSource={events}
          loading={isLoading}
          locale={{
            emptyText: <Empty description="No events yet" className="py-16" />,
          }}
          pagination={{ pageSize: 10, hideOnSinglePage: true }}
          onRow={(record) => ({
            onClick: () => {
              if (canModify(currentUser, record.organizerId)) {
                router.push(`${pathname}/${record.id}/edit`);
              } else {
                router.push(`${pathname}/${record.id}`);
              }
            },
            className: "cursor-pointer",
          })}
          className="rounded-2xl overflow-hidden border border-app-border"
        />
      )}
    </div>
  );
}
