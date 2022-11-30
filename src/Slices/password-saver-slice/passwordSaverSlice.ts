import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface passwordInterface {
    "_id": string,
    "title": string,
    "password": string,
    "createdAt": string,
    "updatedAt": string,
    "__v": number
}

export const passwordSaverSlice = createApi({
    reducerPath: 'passwordSaverApi',
    baseQuery:fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/passwords",
        prepareHeaders(headers) {
            return headers
        }
    }),
    tagTypes: ['Passwords'],
    endpoints(builder) {
        return {
            fetchPasswords: builder.query<passwordInterface[], string|void> ({
                query: () => '/',
                providesTags: ['Passwords']
            }),
            deletePassword: builder.mutation({
                query: (id:string) => ({
                    url: `/${id}`,
                    method: 'DELETE'
                }),
                invalidatesTags: ['Passwords']
            }),
            addPassword: builder.mutation({
                query: (newPassword: {title:string, password:string}) => ({
                    url: `/`,
                    method: 'POST',
                    body: newPassword
                }),
                invalidatesTags: ['Passwords']
            }),
            updatePassword: builder.mutation({
                query(data: {id:string, body:{title:string, password:string}}) {
                    const { id, body } = data
                    return {
                        url: `/${id}`,
                        method: 'PATCH',
                        body: body
                    }
                },
                invalidatesTags: ['Passwords']
            })
        }
    },
})

export const { useFetchPasswordsQuery, useAddPasswordMutation, useDeletePasswordMutation, useUpdatePasswordMutation } = passwordSaverSlice