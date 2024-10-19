/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/constants"

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}`,

    prepareHeaders: (headers, { getState, endpoint }) => {
      const token = (getState() as any)?.auth?.accessToken;

      if (token && endpoint !== "getAccessModules") {
        headers.set("x-access-token", token);
      }
      return headers;
    },
  }),

  endpoints: () => ({}),
});

export default apiSlice;
