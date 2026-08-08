// src/app/(MainPage)/events/[id]/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  useGetEventByIdQuery,
  useDeleteEventMutation,
} from "@/redux/feature/event/eventApi";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/feature/authSlice";
import { canModify } from "@/utils/canModify";
import { Spin, Alert, Button, Popconfirm, message } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ArrowLeftOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const currentUser = useAppSelector(selectCurrentUser);
  const { data, isLoading, error } = useGetEventByIdQuery(id);
  const [deleteEvent, { isLoading: isDeleting }] = useDeleteEventMutation();

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
        <Alert type="error" message="Event not found" showIcon />
      </div>
    );
  }

  const event = data?.data;
  if (!event) return null;
  const editable = canModify(currentUser, event.organizerId);

  const handleDelete = async () => {
    try {
      await deleteEvent(id).unwrap();
      message.success("Event deleted");
      router.push("/events");
    } catch (err: any) {
      message.error(err?.data?.errorMessage || "Couldn't delete event");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Button
        type="text"
        icon={<ArrowLeftOutlined />}
        onClick={() => router.push("/events")}
        className="mb-4"
      >
        Back to events
      </Button>

      {event.coverImage && (
        <img
          src={event.coverImage}
          alt={event.title}
          className="w-full h-64 object-cover rounded-2xl mb-6"
        />
      )}

      <div className="flex items-start justify-between gap-4 mb-2">
        <h1 className="text-3xl font-bold text-app-text">{event.title}</h1>
        {editable && (
          <div className="flex gap-2 shrink-0">
            <Link href={`/events/${id}/edit`}>
              <Button icon={<EditOutlined />} />
            </Link>
            <Popconfirm
              title="Delete this event?"
              description="This can't be undone."
              onConfirm={handleDelete}
              okText="Delete"
              okButtonProps={{ danger: true, loading: isDeleting }}
            >
              <Button icon={<DeleteOutlined />} danger />
            </Popconfirm>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4 text-sm text-app-text-light mb-6">
        <span className="flex items-center gap-1.5">
          <CalendarOutlined />
          {new Date(event.eventDate).toLocaleString(undefined, {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </span>
        <span className="flex items-center gap-1.5">
          <EnvironmentOutlined />
          {event.location}
        </span>
      </div>

      <p className="text-xs text-app-text-muted mb-6">
        Organized by {event.organizer?.fullName || event.organizer?.username}
      </p>

      <div className="prose max-w-none text-app-text whitespace-pre-wrap leading-relaxed">
        {event.description}
      </div>
    </div>
  );
}
