import apiSlice from "./apislice";

export const todaysClassApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Login
    getTodaysClasses: builder.query({
      query: () => {
        return {
          url: "/todays-classes",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetTodaysClassesQuery } = todaysClassApi;
