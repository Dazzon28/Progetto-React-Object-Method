import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const fetchAllData = createApi({
    reducerPath:"fetchDataApi",
    baseQuery:fetchBaseQuery({
        baseUrl:"http://localhost:8080/api/",
    }),
    endpoints: (builder) => ({
        getAllData: builder.query({
          query: (name) => name+`/all`,
        }),
      }),
})

export const {useGetAllDataQuery} = fetchAllData