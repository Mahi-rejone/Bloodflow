// src/app/(MainPage)/events/new/page.tsx
"use client";

import { Form, Input, DatePicker, Button, message } from "antd";
import { useRouter } from "next/navigation";
import { useCreateEventMutation } from "@/redux/feature/event/eventApi";

export default function NewEventPage() {
  const router = useRouter();
  const [createEvent, { isLoading }] = useCreateEventMutation();

  const onFinish = async (values: any) => {
    const payload = {
      title: values.title,
      description: values.description,
      location: values.location,
      coverImage: values.coverImage,
      eventDate: values.eventDate?.toISOString(),
    };

    try {
      const result = await createEvent(payload).unwrap();
      message.success("Event created");
      router.push(`/events/${result.data.id}`);
    } catch (err: any) {
      message.error(err?.data?.errorMessage || "Couldn't create event");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-app-text mb-8">New Event</h1>
      <Form layout="vertical" onFinish={onFinish}>
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
          <Input.TextArea rows={6} placeholder="Describe the event..." />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            style={{ backgroundColor: "#dc2626" }}
          >
            Create Event
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
