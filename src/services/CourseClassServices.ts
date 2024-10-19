import apiSlice from "./apislice";

export const courseClassApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET
    getCourseClasses: builder.query({
      query: () => {
        return {
          url: "/classes",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetCourseClassesQuery } = courseClassApi;
