import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


interface UrlsInterface {
    "_id": string
    "name": string
    "address": string
    "createdAt": string
    "updatedAt": string
    "__v": number
}

export const userUrlsSplice = createApi({
    reducerPath: 'userUrlApi',
    baseQuery:fetchBaseQuery({
        baseUrl: 'http://localhost:8000/api/users',
        prepareHeaders(headers) {
            return headers
        }
    }),
    tagTypes: ['userUrls'],
    endpoints(builder) {
        return {
            fetchUserUrls: builder.query<UrlsInterface[], string|void> ({
                query: (userId:string) => {
                    return `/${userId}/url`
                },
                providesTags: ['userUrls']
            }),
            addUserUrls: builder.mutation({
                query(data: {userId:string, urlId:string}) {
                    const {userId, urlId} = data
                    return {
                        url: `/${userId}/add-url/${urlId}`,
                        method: "PATCH"
                    }
                },
                invalidatesTags: ['userUrls']
            }),
            removeUserUrls: builder.mutation({
                query(data: {userId:string, urlId:string}) {
                    const {userId, urlId} = data
                    return {
                        url: `/${userId}/remove-url/${urlId}`,
                        method: "PATCH"
                    }
                },
                invalidatesTags: ['userUrls']
            })
        }
    }
})

export const { useFetchUserUrlsQuery, useAddUserUrlsMutation, useRemoveUserUrlsMutation } = userUrlsSplice