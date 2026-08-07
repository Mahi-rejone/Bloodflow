"use client";

import { Form, Input, Button, message, Spin } from "antd";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  useGetBlogByIdQuery,
  useUpdateBlogMutation,
} from "@/redux/feature/blog/blogApi";

export default function EditBlogPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data, isLoading: isFetching } = useGetBlogByIdQuery(id);
  const [updateBlog, { isLoading }] = useUpdateBlogMutation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (data?.data) {
      form.setFieldsValue({
        title: data.data.title,
        coverImage: data.data.coverImage,
        content: data.data.content,
      });
    }
  }, [data, form]);

  const onFinish = async (values: any) => {
    try {
      await updateBlog({ id, ...values }).unwrap();
      message.success("Blog updated");
      router.push(`/blogs/${id}`);
    } catch (err: any) {
      message.error(err?.data?.errorMessage || "Couldn't update blog");
    }
  };

  if (isFetching) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-app-text mb-8">Edit Blog</h1>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="title"
          rules={[{ required: true, message: "Required" }]}
        >
          <Input placeholder="Title" size="large" />
        </Form.Item>
        <Form.Item name="coverImage">
          <Input placeholder="Cover image URL (optional)" />
        </Form.Item>
        <Form.Item
          name="content"
          rules={[{ required: true, message: "Required" }]}
        >
          <Input.TextArea rows={10} />
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
