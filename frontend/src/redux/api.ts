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

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
    reducerPath: "api",
    tagTypes: [],
    endpoints: (builder) => ({ 
        getUsers: builder.query<User[],void>({
            query: () => "/user/find-all"
        }),
        getHomesByUser: builder.query<Home[],number | undefined>({
            query: (userId) => `home/find-by-user?userId=${userId}`
        })  
    })
})

export const {useGetUsersQuery, useGetHomesByUserQuery} = api;
