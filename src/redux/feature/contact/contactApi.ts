import { baseApi } from "../../api/baseApi";

export type TContactMessagePayload = {
  name: string;
  email: string;
  message: string;
};

export type TContactMessage = TContactMessagePayload & {
  id: string;
  isResolved: boolean;
  createdAt: string;
};

export const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createContactMessage: builder.mutation<
      {
        success: boolean;
        message: string;
        data: TContactMessage;
      },
      TContactMessagePayload
    >({
      query: (payload) => ({
        url: "/contact",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Contact"],
    }),

    getAllContactMessages: builder.query<
      {
        success: boolean;
        message: string;
        data: TContactMessage[];
      },
      void
    >({
      query: () => "/contact",
      providesTags: ["Contact"],
    }),
  }),
});

export const {
  useCreateContactMessageMutation,
  useGetAllContactMessagesQuery,
} = contactApi;
