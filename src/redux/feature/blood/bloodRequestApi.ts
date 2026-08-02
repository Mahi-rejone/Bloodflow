
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
      query: (id: string) => `/blood/${id}`,
      providesTags: ["BloodRequest"],
    }),
  }),
});

export const { useCreateBloodRequestMutation, useGetPendingRequestsQuery, useGetBloodRequestByIdQuery } = bloodRequestApi;
