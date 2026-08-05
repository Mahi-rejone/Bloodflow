// src/redux/api/baseApi.ts
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
  // 1. Run the initial API request
  let result = await baseQuery(args, api, extraOptions);

  // 2. If the request fails with a 401 Unauthorized error
  if (result.error && result.error.status === 401) {
    // 3. Try to get a new access token
    // (credentials: "include" ensures the refresh cookie is automatically sent if using HTTP-only cookies)
    const refreshResult = (await baseQuery(
      { url: "/auth/refresh-token", method: "POST" },
      api,
      extraOptions,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    )) as any;
    if (refreshResult?.data?.data) {
      const user = (api.getState() as RootState).persisted.auth.user;
      api.dispatch(
        setCredentials({
          user: user,
          accessToken: refreshResult.data.data,
        }),
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const logOutAction = (baseApi.endpoints as any).logOut.initiate;

      if (logOutAction) {
        try {
          const logOutResult = await api.dispatch(logOutAction()).unwrap();

          if (logOutResult?.success) {
            api.dispatch(logout());

            await Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Session expired. Successfully Logged Out!",
              showConfirmButton: false,
              timer: 1500,
            });

            // FIX 2: Force browser to reload so AuthorizedLayout catches the deleted cookie
            window.location.reload();
          }
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          // Fallback logout if the API logout endpoint itself fails
          api.dispatch(logout());
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
