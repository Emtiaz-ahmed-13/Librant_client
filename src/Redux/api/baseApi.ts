import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

// Check for development or production environment
const isDevelopment = import.meta.env.MODE === "development";
// https://librant-server.vercel.app
// http://localhost:5001/api/v1
const API_BASE_URL = isDevelopment
  ? "http://localhost:5001/api/v1"
  : "https://librant-server.vercel.app";

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  tagTypes: ["User", "Books", "Categories", "Orders"],
  endpoints: () => ({}),
});
