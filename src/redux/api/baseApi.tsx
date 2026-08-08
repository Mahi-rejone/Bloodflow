import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store/store";
import { logout, setCredentials } from "../feature/authSlice";
import Swal from "sweetalert2";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1",
  credentials: "include",

  prepareHeaders: (headers) => {
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // --------------------------------------------------
  // 1. Make the original request
  // --------------------------------------------------

  let result = await baseQuery(args, api, extraOptions);

  // --------------------------------------------------
  // 2. If access token expired
  // --------------------------------------------------

  if (result.error?.status === 401) {
    console.log("Access token expired. Trying refresh token...");

    // ------------------------------------------------
    // 3. Request a new access token
    // ------------------------------------------------

    const refreshResult = await baseQuery(
      {
        url: "/auth/refresh-token",
        method: "POST",
      },
      api,
      extraOptions,
    );

    // ------------------------------------------------
    // 4. Refresh successful
    // ------------------------------------------------

    if (refreshResult.data) {
      const state = api.getState() as RootState;

      const user = state.persisted?.auth?.user;

      // Backend may return:
      //
      // {
      //   success: true,
      //   data: "new-access-token"
      // }
      //
      const refreshData = refreshResult.data as {
        data?: string;
        accessToken?: string;
      };

      const newAccessToken = refreshData.data ?? refreshData.accessToken;

      if (newAccessToken) {
        api.dispatch(
          setCredentials({
            user,
            accessToken: newAccessToken,
          }),
        );
      }

      // ------------------------------------------------
      // 5. Retry original request
      // ------------------------------------------------

      result = await baseQuery(args, api, extraOptions);
    } else {
      // ------------------------------------------------
      // 6. Refresh failed
      // ------------------------------------------------

      api.dispatch(logout());

      // Only access window in the browser
      if (typeof window !== "undefined") {
        try {
          await Swal.fire({
            position: "top-end",
            icon: "warning",
            title: "Session expired",
            text: "Please login again.",
            showConfirmButton: false,
            timer: 1500,
          });
        } finally {
          window.location.reload();
        }
      }
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",

  baseQuery: baseQueryWithRefreshToken,

  tagTypes: [
    "User",
    "UserProfile",
    "BloodRequest",
    "BloodDonationHistory",
    "Blog",
    "Event",
  ],

  endpoints: () => ({}),
});
