"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  useGetBlogByIdQuery,
  useDeleteBlogMutation,
} from "@/redux/feature/blog/blogApi";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/feature/authSlice";
import { canModify } from "@/utils/canModify";
import { Spin, Alert, Button, Popconfirm, message } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";

export default function BlogDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const currentUser = useAppSelector(selectCurrentUser);
  const { data, isLoading, error } = useGetBlogByIdQuery(id);
  const [deleteBlog, { isLoading: isDeleting }] = useDeleteBlogMutation();

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
        <Alert type="error" message="Blog not found" showIcon />
      </div>
    );
  }

  const blog = data?.data;
  if (!blog) return null;
  const editable = canModify(currentUser, blog.authorId);

  const handleDelete = async () => {
    try {
      await deleteBlog(id).unwrap();
      message.success("Blog deleted");
      router.push("/blogs");
    } catch (err: any) {
      message.error(err?.data?.errorMessage || "Couldn't delete blog");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Button
        type="text"
        icon={<ArrowLeftOutlined />}
        onClick={() => router.push("/blogs")}
        className="mb-4"
      >
        Back to blogs
      </Button>

      {blog.coverImage && (
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-64 object-cover rounded-2xl mb-6"
        />
      )}

      <div className="flex items-start justify-between gap-4 mb-2">
        <h1 className="text-3xl font-bold text-app-text">{blog.title}</h1>
        {editable && (
          <div className="flex gap-2 shrink-0">
            <Link href={`/blogs/${id}/edit`}>
              <Button icon={<EditOutlined />} />
            </Link>
            <Popconfirm
              title="Delete this blog?"
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

      <p className="text-sm text-app-text-light mb-6">
        By {blog.author?.fullName || blog.author?.username} ·{" "}
        {new Date(blog.createdAt).toLocaleDateString()}
      </p>

      <div className="prose max-w-none text-app-text whitespace-pre-wrap leading-relaxed">
        {blog.content}
      </div>
    </div>
  );
}
