import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface userActiveTodo {
    "_id":string
    "title":string
    "createdAt": string
    "updatedAt": string
    "__v": number
}


export const userActiveTodoSlice = createApi({
    reducerPath: 'userActiveTodoApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/api/users',
        prepareHeaders(headers) {
            return headers
        },
    }),
    tagTypes: ['userActiveList'],
    endpoints(builder) {
        return {
            fetchUserActiveTodo: builder.query<userActiveTodo[], string|void> ({
                query:(userId) => {
                    return `/${userId}/activeList`
                },
                providesTags: ['userActiveList']
            }),
            addUserActiveTodo: builder.mutation({
                query(data:{userId:string, todoId:string}) {
                    const {userId,todoId} = data
                    return {
                        url: `/${userId}/add-activeList/${todoId}`,
                        method: 'PATCH'
                    }
                },
                invalidatesTags: ['userActiveList']
            }),
            removeUserActiveTodo: builder.mutation({
                query(data:{userId:string, todoId:string}) {
                    const {userId, todoId} = data
                    return {
                        url: `/${userId}/remove-activeList/${todoId}`,
                        method: 'PATCH'
                    }
                },
                invalidatesTags: ['userActiveList']
            })
        }
    }
})

export const {useFetchUserActiveTodoQuery, useAddUserActiveTodoMutation, useRemoveUserActiveTodoMutation} = userActiveTodoSlice