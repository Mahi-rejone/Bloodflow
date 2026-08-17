import { baseApi } from "../../api/baseApi";

const bloodRequestApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBloodRequest: builder.mutation({
      query: (payload) => ({
        url: "/blood/create-request",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["BloodRequest"],
    }),
    getPendingRequests: builder.query({
      query: () => "/blood/pending",
      providesTags: ["BloodRequest"],
    }),
    getBloodRequestById: builder.query({
      query: (id: string) => `/blood/${id}/get-single`,
      providesTags: ["BloodRequest"],
    }),
    acceptBloodRequest: builder.mutation({
      query: ({ id, units }: { id: string; units: number }) => ({
        url: `/blood/${id}/accept`,
        method: "POST",
        body: { units },
      }),
      invalidatesTags: ["BloodRequest"],
    }),
    verifyDonationOtp: builder.mutation({
      query: (payload: { donationId: string; otp: string }) => ({
        url: "/blood/verify-otp",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["BloodRequest"],
    }),

    getContributionsForRequest: builder.query({
      query: (requestId: string) => `/blood/${requestId}/contributions`,
      providesTags: ["BloodRequest"],
    }),

    getMyContribution: builder.query({
      query: (requestId: string) => `/blood/${requestId}/my-contribution`,
      providesTags: ["BloodRequest"],
    }),
    getCompletedRequestsCount: builder.query({
      query: () => "/blood/completed-count",
      providesTags: ["BloodRequest"],
    }),
    getMyDonations: builder.query({
      query: () => "/blood/my-donations",
      providesTags: ["BloodRequest"],
    }),
    getMyRequests: builder.query({
      query: () => "/blood/my-requests",
      providesTags: ["BloodRequest"],
    }),
    getMyRequestById: builder.query({
      query: (id: string) => `/blood/my-request/${id}`,
      providesTags: ["BloodRequest"],
    }),
    getMyPendingDonations: builder.query({
      query: () => "/blood/my-pending-donations",
      providesTags: ["BloodRequest"],
    }),
    getMyPendingDonationById: builder.query({
      query: (id: string) => `/blood/my-pending-donations/${id}`,
      providesTags: ["BloodRequest"],
    }),
    getLatestFive: builder.query({
      query: () => ({ url: `/blood/get-latest-five`, method: "GET" }),
      providesTags: ["BloodRequest"],
    }),
  }),
});

export const {
  useCreateBloodRequestMutation,
  useGetPendingRequestsQuery,
  useGetBloodRequestByIdQuery,
  useAcceptBloodRequestMutation,
  useGetCompletedRequestsCountQuery,
  useGetMyDonationsQuery,
  useGetMyRequestsQuery,
  useGetMyPendingDonationsQuery,
  useVerifyDonationOtpMutation,
  useGetContributionsForRequestQuery,
  useGetMyContributionQuery,
  useGetMyPendingDonationByIdQuery,
  useGetMyRequestByIdQuery,
  useGetLatestFiveQuery,
} = bloodRequestApi;
