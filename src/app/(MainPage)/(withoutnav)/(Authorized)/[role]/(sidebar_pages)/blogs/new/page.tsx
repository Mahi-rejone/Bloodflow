"use client";

import { Form, Input, Button, message } from "antd";
import { useRouter } from "next/navigation";
import { useCreateBlogMutation } from "@/redux/feature/blog/blogApi";

export default function NewBlogPage() {
  const router = useRouter();
  const [createBlog, { isLoading }] = useCreateBlogMutation();

  const onFinish = async (values: any) => {
    try {
      const result = await createBlog(values).unwrap();
      message.success("Blog published");
      router.push(`/blogs/${result.data.id}`);
    } catch (err: any) {
      message.error(err?.data?.errorMessage || "Couldn't create blog");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-app-text mb-8">New Blog</h1>
      <Form layout="vertical" onFinish={onFinish}>
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
          <Input.TextArea rows={10} placeholder="Write your blog content..." />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            style={{ backgroundColor: "#dc2626" }}
          >
            Publish
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
