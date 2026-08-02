import { baseApi } from "@/redux/api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (payload) => ({
        url: "/user/create-user",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["User"],
    }),
    verifyUser: builder.mutation({
      query: (payload) => ({
        url: "/user/verify",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["User"],
    }),
    resendVerificationCode: builder.mutation({
      query: (payload) => ({
        url: "/user/resend-verification",
        method: "POST",
        body: payload,
      }),
    }),
    getMe: builder.query({
      query: () => ({
        url: "/user/get-me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useVerifyUserMutation,
  useResendVerificationCodeMutation,
  useGetMeQuery,
} = userApi;
