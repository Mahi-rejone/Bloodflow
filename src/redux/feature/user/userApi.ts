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
    getMe : builder.query({
      query: (payload)=>({
        url: "/user/get-me",
        method: "GET",
      }),
      providesTags:["User"]
    })
  }),
});
export const { useCreateUserMutation } = userApi;