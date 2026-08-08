// src/app/(MainPage)/events/[id]/edit/page.tsx
"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Form,
  Input,
  DatePicker,
  Button,
  message,
  Spin,
  Alert,
  Card,
  Popconfirm,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import {
  useGetEventByIdQuery,
  useUpdateEventMutation,
  useDeleteEventMutation,
} from "@/redux/feature/event/eventApi";

export default function EditEventPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data, isLoading: isFetching, error } = useGetEventByIdQuery(id);
  const [updateEvent, { isLoading }] = useUpdateEventMutation();
  const [deleteEvent, { isLoading: isDeleting }] = useDeleteEventMutation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (data?.data) {
      form.setFieldsValue({
        title: data.data.title,
        description: data.data.description,
        location: data.data.location,
        coverImage: data.data.coverImage,
        eventDate: data.data.eventDate ? dayjs(data.data.eventDate) : undefined,
      });
    }
  }, [data, form]);

  const onFinish = async (values: any) => {
    const payload = {
      title: values.title,
      description: values.description,
      location: values.location,
      coverImage: values.coverImage,
      eventDate: values.eventDate?.toISOString(),
    };

    try {
      await updateEvent({ id, ...payload }).unwrap();
      message.success("Event updated");
      router.push(`/events/${id}`);
    } catch (err: any) {
      message.error(err?.data?.errorMessage || "Couldn't update event");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteEvent(id).unwrap();
      message.success("Event deleted");
      router.push("/events");
    } catch (err: any) {
      message.error(err?.data?.errorMessage || "Couldn't delete event");
    }
  };

  if (isFetching) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-2xl mx-auto mt-12 px-4">
        <Alert type="error" message="Couldn't load this event" showIcon />
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-app-text">Edit Event</h1>
        <Popconfirm
          title="Delete this event?"
          description="This action can't be undone."
          okText="Delete"
          okButtonProps={{ danger: true, loading: isDeleting }}
          cancelText="Cancel"
          onConfirm={handleDelete}
        >
          <Button danger icon={<DeleteOutlined />} loading={isDeleting}>
            Delete
          </Button>
        </Popconfirm>
      </div>

      <Card className="rounded-2xl border border-app-border shadow-sm">
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Required" }]}
          >
            <Input placeholder="Event title" size="large" />
          </Form.Item>

          <Form.Item
            name="eventDate"
            label="Date & Time"
            rules={[{ required: true, message: "Please select a date" }]}
          >
            <DatePicker
              showTime
              size="large"
              style={{ width: "100%" }}
              placeholder="Event date & time"
            />
          </Form.Item>

          <Form.Item
            name="location"
            label="Location"
            rules={[{ required: true, message: "Required" }]}
          >
            <Input placeholder="Location" size="large" />
          </Form.Item>

          <Form.Item name="coverImage" label="Cover Image URL">
            <Input placeholder="https://... (optional)" size="large" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Required" }]}
          >
            <Input.TextArea rows={8} />
          </Form.Item>

          <Form.Item className="mb-0">
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              size="large"
              style={{ backgroundColor: "#dc2626" }}
            >
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
