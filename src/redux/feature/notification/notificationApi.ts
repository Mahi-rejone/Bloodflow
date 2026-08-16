// src/redux/feature/notification/notificationApi.ts
import { baseApi } from "../../api/baseApi";

const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyNotifications: builder.query({
      query: () => "/notification",
      providesTags: ["Notification"],
    }),
    getUnreadCount: builder.query({
      query: () => "/notification/unread-count",
      providesTags: ["Notification"],
    }),
    markAsRead: builder.mutation({
      query: (id: string) => ({
        url: `/notification/${id}/read`,
        method: "PATCH",
      }),
      invalidatesTags: ["Notification"],
    }),
    markAllAsRead: builder.mutation({
      query: () => ({
        url: "/notification/mark-all-read",
        method: "PATCH",
      }),
      invalidatesTags: ["Notification"],
    }),
    createNotification: builder.mutation({
      query: (payload) => ({
        url: "/notification/create-notification",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Notification"],
    }),
    notifyDonors: builder.mutation({
      query: (payload: { message: string; donorIds: string[] }) => ({
        url: "/notification/notify-donors",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Notification"],
    }),
  }),
});

export const {
  useGetMyNotificationsQuery,
  useGetUnreadCountQuery,
  useMarkAsReadMutation,
  useMarkAllAsReadMutation,
  useCreateNotificationMutation,
  useNotifyDonorsMutation,
} = notificationApi;
