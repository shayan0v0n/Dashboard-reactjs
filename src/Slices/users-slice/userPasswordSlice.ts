import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type passwordStructure = {
    title:string,
    shortDesc:string,
    text:string
}

interface passwordInterface {
    "_id": string
    "title": string
    "password":string
    "createdAt": string
    "updatedAt": string
    "__v": number
}

export const userPasswordSlice = createApi({
    reducerPath: 'userPasswordApi',
    baseQuery:fetchBaseQuery({
        baseUrl: 'http://localhost:8000/api/users',
        prepareHeaders(headers) {
            return headers
        }
    }),
    tagTypes: ['userPassword'],
    endpoints(builder) {
        return {
            fetchUserPassword: builder.query<passwordInterface[], string|void> ({
                query: (userId:string) => {
                    return `/${userId}/pass`
                },
                providesTags: ['userPassword']
            }),
            addUserPassword: builder.mutation({
                query(data: {userId:string, passId:string}) {
                    const {userId, passId} = data
                    return {
                        url: `/${userId}/add-pass/${passId}`,
                        method: "PATCH"
                    }
                },
                invalidatesTags: ['userPassword']
            }),
            removeUserPassword: builder.mutation({
                query(data: {userId:string, passId:string}) {
                    const {userId, passId} = data
                    return {
                        url: `/${userId}/remove-pass/${passId}`,
                        method: "PATCH"
                    }
                },
                invalidatesTags: ['userPassword']
            })
        }
    }
})

export const { useFetchUserPasswordQuery, useAddUserPasswordMutation, useRemoveUserPasswordMutation } = userPasswordSlice