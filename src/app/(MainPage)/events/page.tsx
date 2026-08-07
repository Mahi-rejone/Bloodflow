// src/app/(MainPage)/events/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Table, Button, Popconfirm, message, Alert, Spin } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
  useGetAllEventsQuery,
  useDeleteEventMutation,
} from "@/redux/feature/event/eventApi";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/feature/authSlice";
import { canModify } from "@/utils/canModify";

const STAFF_ROLES = ["ADMIN", "BLOOD_BANK_MANAGER", "HOSPITAL_REPRESENTATIVE"];

export default function EventsPage() {
  const router = useRouter();
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

  const events = data?.data ?? [];

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (title: string, record: any) => (
        <Link
          href={`/events/${record.id}`}
          className="text-app-primary font-medium hover:underline"
        >
          {title}
        </Link>
      ),
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Date",
      dataIndex: "eventDate",
      key: "eventDate",
      render: (date: string) =>
        new Date(date).toLocaleString(undefined, {
          dateStyle: "medium",
          timeStyle: "short",
        }),
      sorter: (a: any, b: any) =>
        new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime(),
    },
    {
      title: "Organizer",
      key: "organizer",
      render: (_: any, record: any) =>
        record.organizer?.fullName || record.organizer?.username,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => {
        const editable = canModify(currentUser, record.organizerId);
        if (!editable) return null;
        return (
          <div className="flex gap-2">
            <Link href={`/events/${record.id}/edit`}>
              <Button size="small" icon={<EditOutlined />} />
            </Link>
            <Popconfirm
              title="Delete this event?"
              description="This can't be undone."
              onConfirm={() => handleDelete(record.id)}
              okText="Delete"
              okButtonProps={{ danger: true, loading: isDeleting }}
            >
              <Button size="small" icon={<DeleteOutlined />} danger />
            </Popconfirm>
          </div>
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
        <Link href="/events/new">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            style={{ backgroundColor: "#dc2626" }}
          >
            New Event
          </Button>
        </Link>
      </div>

      {isLoading && (
        <div className="flex justify-center py-24">
          <Spin size="large" />
        </div>
      )}

      {error && <Alert type="error" message="Couldn't load events" showIcon />}

      {!isLoading && !error && (
        <Table
          dataSource={events}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      )}
    </div>
  );
}
