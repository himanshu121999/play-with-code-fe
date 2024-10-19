import apiSlice from "./apislice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Login
    login: builder.mutation({
      query: (body: { username: string; password: string }) => {
        return {
          url: "/students/login",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
