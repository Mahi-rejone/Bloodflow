// src/app/(MainPage)/events/[id]/edit/page.tsx
"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Form, Input, DatePicker, Button, message, Spin, Alert } from "antd";
import dayjs from "dayjs";
import {
  useGetEventByIdQuery,
  useUpdateEventMutation,
} from "@/redux/feature/event/eventApi";

export default function EditEventPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data, isLoading: isFetching, error } = useGetEventByIdQuery(id);
  const [updateEvent, { isLoading }] = useUpdateEventMutation();
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

  if (isFetching) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto mt-12 px-4">
        <Alert type="error" message="Couldn't load this event" showIcon />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-app-text mb-8">Edit Event</h1>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="title"
          rules={[{ required: true, message: "Required" }]}
        >
          <Input placeholder="Event title" size="large" />
        </Form.Item>

        <Form.Item
          name="eventDate"
          rules={[{ required: true, message: "Please select a date" }]}
        >
          <DatePicker
            showTime
            style={{ width: "100%" }}
            placeholder="Event date & time"
          />
        </Form.Item>

        <Form.Item
          name="location"
          rules={[{ required: true, message: "Required" }]}
        >
          <Input placeholder="Location" />
        </Form.Item>

        <Form.Item name="coverImage">
          <Input placeholder="Cover image URL (optional)" />
        </Form.Item>

        <Form.Item
          name="description"
          rules={[{ required: true, message: "Required" }]}
        >
          <Input.TextArea rows={6} />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            style={{ backgroundColor: "#dc2626" }}
          >
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}