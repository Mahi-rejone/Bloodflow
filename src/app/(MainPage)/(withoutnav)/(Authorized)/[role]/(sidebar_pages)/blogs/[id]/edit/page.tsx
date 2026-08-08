"use client";

import { Form, Input, Button, message, Spin, Card, Popconfirm } from "antd";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import {
  useGetBlogByIdQuery,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} from "@/redux/feature/blog/blogApi";

export default function EditBlogPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data, isLoading: isFetching } = useGetBlogByIdQuery(id);
  const [updateBlog, { isLoading }] = useUpdateBlogMutation();
  const [deleteBlog, { isLoading: isDeleting }] = useDeleteBlogMutation();
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

  const handleDelete = async () => {
    try {
      await deleteBlog(id).unwrap();
      message.success("Blog deleted");
      router.push("/blogs");
    } catch (err: any) {
      message.error(err?.data?.errorMessage || "Couldn't delete blog");
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
    <div className="w-full max-w-5xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-app-text">Edit Blog</h1>
        <Popconfirm
          title="Delete this blog?"
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
            <Input placeholder="Blog title" size="large" />
          </Form.Item>

          <Form.Item name="coverImage" label="Cover Image URL">
            <Input placeholder="https://... (optional)" size="large" />
          </Form.Item>

          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true, message: "Required" }]}
          >
            <Input.TextArea rows={12} />
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
