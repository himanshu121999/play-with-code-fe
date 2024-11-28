/* eslint-disable @typescript-eslint/no-explicit-any */
import { authTokenKeyName } from "../utils/configs/authConfig";
import apiSlice from "./apislice";

export const assignmentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET
    getAssignments: builder.query({
      providesTags: ["assignments"],
      query: () => {
        return {
          url: "/assignments",
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem(authTokenKeyName)}`,
          },
        };
      },
    }),

    getAssignmentById: builder.query({
      providesTags: ["assignment"],
      query: (assignmentId) => {
        return {
          url: `/assignments/${assignmentId}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem(authTokenKeyName)}`,
          },
        };
      },
    }),

    submitAssignment: builder.mutation({
      invalidatesTags: ["assignment", "assignments"],
      query: ({ assignmentId, body }: any) => {
        return {
          url: `/assignments/submit/${assignmentId}`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem(authTokenKeyName)}`,
          },
          body,
        };
      },
    }),
  }),
});

export const {
  useGetAssignmentsQuery,
  useGetAssignmentByIdQuery,
  useSubmitAssignmentMutation,
} = assignmentApi;
