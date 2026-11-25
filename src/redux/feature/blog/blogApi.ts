import { baseApi } from "../../api/baseApi";

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBlogs: builder.query({
      query: () => "/blog",
      providesTags: ["Blog"],
    }),
    getBlogById: builder.query({
      query: (id: string) => `/blog/${id}`,
      providesTags: ["Blog"],
    }),
    createBlog: builder.mutation({
      query: (payload) => ({
        url: "/blog/create-blog",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Blog"],
    }),
    updateBlog: builder.mutation({
      query: ({ id, ...payload }) => ({
        url: `/blog/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Blog"],
    }),
    deleteBlog: builder.mutation({
      query: (id: string) => ({
        url: `/blog/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blog"],
    }),
    getLatestFiveBlog: builder.query({
      query: () => ({ url: `/blog/get-latest-five`, method: "GET" }),
      providesTags: ["Blog"],
    }),
  }),
});

export const {
  useGetAllBlogsQuery,
  useGetBlogByIdQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useGetLatestFiveBlogQuery,
} = blogApi;
