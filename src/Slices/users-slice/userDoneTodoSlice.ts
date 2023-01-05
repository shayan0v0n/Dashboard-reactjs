import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface userDoneTodo {
    "_id":string
    "title":string
    "createdAt": string
    "updatedAt": string
    "__v": number
}


export const userDoneTodoSlice = createApi({
    reducerPath: 'userDoneTodoApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/api/users',
        prepareHeaders(headers) {
            return headers
        },
    }),
    tagTypes: ['userDoneList'],
    endpoints(builder) {
        return {
            fetchUserDoneTodos: builder.query<userDoneTodo[], string|void> ({
                query:(userId) => {
                    return `/${userId}/DoneList`
                },
                providesTags: ['userDoneList']
            }),
            addUserDoneTodo: builder.mutation({
                query(data:{userId:string, todoId:string}) {
                    const {userId,todoId} = data
                    return {
                        url: `/${userId}/add-DoneList/${todoId}`,
                        method: 'PATCH'
                    }
                },
                invalidatesTags: ['userDoneList']
            }),
            removeUserDoneTodo: builder.mutation({
                query(data:{userId:string, todoId:string}) {
                    const {userId, todoId} = data
                    return {
                        url: `/${userId}/remove-DoneList/${todoId}`,
                        method: 'PATCH'
                    }
                },
                invalidatesTags: ['userDoneList']
            })
        }
    }
})

export const {useFetchUserDoneTodosQuery, useAddUserDoneTodoMutation, useRemoveUserDoneTodoMutation} = userDoneTodoSlice