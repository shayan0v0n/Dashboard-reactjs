import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const searchSlice = createApi({
    reducerPath: 'searchApi',
    baseQuery:fetchBaseQuery({
        baseUrl: "https://serpapi.com/search.json",
        prepareHeaders(headers) {
            return headers
        }
    }),
    tagTypes: ['ActiveList'],
    endpoints(builder) {
        return {
            fetchSearchResult: builder.query ({
                query: (searchTerm:string) => `?q=${searchTerm}&api_key=6a6ed68d46f1f3e4966f92b51e3524853106aad231e69f07370b2f0f268053ae`
            })
        }
    }
})

export const { useFetchSearchResultQuery} = searchSlice;