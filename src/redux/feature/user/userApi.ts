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

    getAllDonors: builder.query({
      query: (filters: {
        bloodGroup?: string;
        district?: string;
        town?: string;
        state?: string;
        search?: string;
      }) => {
        const params = new URLSearchParams();
        if (filters.bloodGroup) params.set("bloodGroup", filters.bloodGroup);
        if (filters.district) params.set("district", filters.district);
        if (filters.town) params.set("town", filters.town);
        if (filters.state) params.set("state", filters.state);
        if (filters.search) params.set("search", filters.search);
        return `/user/donors?${params.toString()}`;
      },
      providesTags: ["User"],
    }),

    getDonorById: builder.query({
      query: (id: string) => `/user/donors/${id}`,
      providesTags: ["User"],
    }),
  }),
});




export const {
  useCreateUserMutation,
  useVerifyUserMutation,
  useResendVerificationCodeMutation,
  useGetMeQuery,
  useGetAllDonorsQuery,
  useGetDonorByIdQuery,
} = userApi;
