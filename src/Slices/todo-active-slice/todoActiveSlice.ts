import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type todoStructure = { title: string, _id: string };
interface ActiveTodoInterface {
    "_id": string,
    "title": string,
    "createdAt": string,
    "updatedAt": string,
    "__v": number
}

export const activeApiSlice = createApi({
    reducerPath: 'activeListApi',
    baseQuery:fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/activeListTodo",
        prepareHeaders(headers) {
            return headers
        }
    }),
    tagTypes: ['ActiveList'],
    endpoints(builder) {
        return {
            fetchActiveTodos: builder.query<ActiveTodoInterface[], string|void> ({
                query: () => '/',
                providesTags: ['ActiveList']
            }),
            deleteActiveTodo: builder.mutation({ 
                query: (id:string) => ({
                  url: `/${id}`,
                  method: 'DELETE'
                }),
                invalidatesTags: ['ActiveList']
            }),
            addActiveTodo: builder.mutation({
                query: (newTodo: {title:string}) => ({
                    url: `/`,
                    method: 'POST',
                    body: newTodo
                }),
                invalidatesTags: ['ActiveList']
            }),
            updateActiveTodo: builder.mutation({
                query(data: {id:string, body:{title:string}}) {
                    const { id, body } = data
                    return {
                      url: `/${id}`,
                      method: 'PATCH',
                      body,
                    }
                },
                invalidatesTags: ['ActiveList']
            })
        }
    }
})

export const { useFetchActiveTodosQuery, useDeleteActiveTodoMutation, useAddActiveTodoMutation, useUpdateActiveTodoMutation } = activeApiSlice;