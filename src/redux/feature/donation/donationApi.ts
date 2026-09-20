import { baseApi } from "../../api/baseApi";

export type TInitiateDonationPayload = { amount: number; note?: string };
export type TInitiateDonationResponse = {
  GatewayPageURL: string;
  donationId: string;
  tranId: string;
};
export type TDonationStatus =
  | "PENDING"
  | "PROCESSING"
  | "PAID"
  | "FAILED"
  | "CANCELLED";
export type TDonation = {
  id: string;
  userId: string;
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  amount: number;
  currency: string;
  note?: string | null;
  tranId: string;
  status: TDonationStatus;
  createdAt: string;
};

const donationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    initiateDonation: builder.mutation<
      { success: boolean; message: string; data: TInitiateDonationResponse },
      TInitiateDonationPayload
    >({
      query: (payload) => ({
        url: "/donations/initiate",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Donation"],
    }),
    getMyMoneyDonations: builder.query<
      { success: boolean; message: string; data: TDonation[] },
      void
    >({
      query: () => "/donations/me",
      providesTags: ["Donation"],
    }),
    getAllDonations: builder.query<
      { success: boolean; message: string; data: TDonation[] },
      void
    >({
      query: () => "/donations",
      providesTags: ["Donation"],
    }),
  }),
});

export const {
  useInitiateDonationMutation,
  useGetMyMoneyDonationsQuery,
  useGetAllDonationsQuery,
} = donationApi;
