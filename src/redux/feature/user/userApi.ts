import { baseApi } from "@/redux/api/baseApi";

export interface UserProfile {
  bloodGroup?: string;
  phoneNumber?: string;
  state?: string;
  district?: string;
  town?: string;
  dateOfBirth?: string;
  gender?: string;
}

export interface UserItem {
  id: string;
  fullName?: string;
  username: string;
  email: string;

  role: "ADMIN" | "BLOOD_BANK_MANAGER" | "HOSPITAL_REPRESENTATIVE" | "USER";

  isVerified: boolean;
  status: string;
  createdAt: string;

  profile?: UserProfile;
}

export interface UpdateMyProfilePayload {
  currentPassword: string;

  status?: "ACTIVE" | "BLOCK";

  phoneNumber?: string;
  guardianNumber?: string;

  state?: string;
  district?: string;
  town?: string;
  address?: string;
  img?: string;
}

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ---------------------------------------------
    // CREATE USER
    // ---------------------------------------------

    createUser: builder.mutation({
      query: (payload) => ({
        url: "/user/create-user",
        method: "POST",
        body: payload,
      }),

      invalidatesTags: ["User"],
    }),

    // ---------------------------------------------
    // VERIFY USER
    // ---------------------------------------------

    verifyUser: builder.mutation({
      query: (payload) => ({
        url: "/user/verify",
        method: "POST",
        body: payload,
      }),

      invalidatesTags: ["User"],
    }),

    // ---------------------------------------------
    // RESEND VERIFICATION
    // ---------------------------------------------

    resendVerificationCode: builder.mutation({
      query: (payload) => ({
        url: "/user/resend-verification",
        method: "POST",
        body: payload,
      }),
    }),

    // ---------------------------------------------
    // GET CURRENT USER
    // ---------------------------------------------

    getMe: builder.query({
      query: () => ({
        url: "/user/get-me",
        method: "GET",
      }),

      providesTags: ["User"],
    }),

    updateMyProfile: builder.mutation<
      { data: UserItem },
      UpdateMyProfilePayload
    >({
      query: (payload) => ({
        url: "/user/update-profile",
        method: "PATCH",
        body: payload,
      }),

      invalidatesTags: ["User"],
    }),

    // ---------------------------------------------
    // GET ALL DONORS
    // ---------------------------------------------

    getAllDonors: builder.query({
      query: (
        filters: {
          bloodGroup?: string;
          district?: string;
          town?: string;
          state?: string;
          search?: string;
        } = {},
      ) => {
        const params = new URLSearchParams();

        if (filters.bloodGroup) {
          params.set("bloodGroup", filters.bloodGroup);
        }

        if (filters.district) {
          params.set("district", filters.district);
        }

        if (filters.town) {
          params.set("town", filters.town);
        }

        if (filters.state) {
          params.set("state", filters.state);
        }

        if (filters.search) {
          params.set("search", filters.search);
        }

        const queryString = params.toString();

        return queryString ? `/user/donors?${queryString}` : "/user/donors";
      },

      providesTags: ["User"],
    }),

    // ---------------------------------------------
    // GET DONOR BY ID
    // ---------------------------------------------

    getDonorById: builder.query({
      query: (id: string) => `/user/donors/${id}`,

      providesTags: ["User"],
    }),

    // ---------------------------------------------
    // GET ALL USERS
    // ---------------------------------------------

    getAllUsers: builder.query<{ data: UserItem[] }, void>({
      query: () => ({
        url: "/user/get-all-users",
        method: "GET",
      }),

      providesTags: ["User"],
    }),

    // ---------------------------------------------
    // GET  USERS BY ID
    // ---------------------------------------------

    getSingleUser: builder.query<{ data: UserItem }, string>({
      query: (id) => `/user/${id}`,
      providesTags: ["User"],
    }),

    // ---------------------------------------------
    // DELETE USER
    // ---------------------------------------------

    deleteUser: builder.mutation<any, string>({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    adminCreateUser: builder.mutation({
      query: (payload) => ({
        url: "/user/admin-create-user",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useVerifyUserMutation,
  useResendVerificationCodeMutation,
  useGetMeQuery,
  useUpdateMyProfileMutation,
  useGetAllDonorsQuery,
  useGetDonorByIdQuery,
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  useDeleteUserMutation,
  useAdminCreateUserMutation,
} = userApi;
