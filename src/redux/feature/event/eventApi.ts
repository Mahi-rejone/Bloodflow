import { baseApi } from "../../api/baseApi";

const eventApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllEvents: builder.query({
      query: () => "/event",
      providesTags: ["Event"],
    }),
    getEventById: builder.query({
      query: (id: string) => `/event/${id}`,
      providesTags: ["Event"],
    }),
    createEvent: builder.mutation({
      query: (payload) => ({
        url: "/event/create-event",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Event"],
    }),
    updateEvent: builder.mutation({
      query: ({ id, ...payload }) => ({
        url: `/event/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Event"],
    }),
    deleteEvent: builder.mutation({
      query: (id: string) => ({
        url: `/event/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Event"],
    }),
  }),
});

export const {
  useGetAllEventsQuery,
  useGetEventByIdQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = eventApi;
