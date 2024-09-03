import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface User {
  userId: number;
  username: string;
  email: string;
}

interface Home {
  homeId: number;
  street_address: string;
  state: string | null;
  zip: string | null;
  sqft: number | null;
  beds: number | null;
  baths: number | null;
  list_price: number | null;
}

interface PaginatedHomesResponse {
  homes: Home[];
  currentPage: number;
  totalPages: number;
  totalHomes: number;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  reducerPath: "api",
  tagTypes: [],
  endpoints: (builder) => ({ 
    getUsers: builder.query<User[], void>({
      query: () => "user/find-all"
    }),
    getHomesByUser: builder.query<PaginatedHomesResponse, { userId: number; page: number }>({
      query: ({ userId, page }) => `home/find-by-user?userId=${userId}&page=${page}`
    }),
    getUsersByHome: builder.query<User[],number>({
        query: (homeId) => `user/find-by-home?homeId=${homeId}`
    }),
  })
})

export const { useGetUsersQuery, useGetHomesByUserQuery, useGetUsersByHomeQuery } = api;