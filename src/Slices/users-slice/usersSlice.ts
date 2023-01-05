import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type userStructure = { email:string, password:string }

interface UserInterface {
    "_id":string
    "email":string
    "password":string
    "createdAt": string
    "updatedAt": string
    "__v": number
}

export const userApiSlice = createApi({
    reducerPath: 'userApi',
    baseQuery:fetchBaseQuery({
        baseUrl: 'http://localhost:8000/api/users',
        prepareHeaders(headers) {
            return headers
        }
    }),
    tagTypes: ['users'],
    endpoints(builder) {
        return {
            fetchUser: builder.query<UserInterface[], string|void> ({
                query() {
                    return '/'
                },
                providesTags: ['users']
            }),
            deleteUser: builder.mutation({
                query: (id:string) => ({
                    url: `/${id}`,
                    method: 'DELETE'
                }),
                invalidatesTags: ['users']
            }),
            addUser: builder.mutation({
                query: (newUser: userStructure) => ({
                    url: '/',
                    method: 'POST',
                    body: newUser
                }),
                invalidatesTags: ['users']
            }),
            updateUser: builder.mutation({
                query(data: {id:string, body: userStructure}) {
                    const {id, body} = data
                    return {
                        url: `/${id}`,
                        method: "PATCH",
                        body
                    }
                },
                invalidatesTags: ['users']
            })
        }
    }
})

export const { useFetchUserQuery, useDeleteUserMutation, useAddUserMutation, useUpdateUserMutation } = userApiSlice