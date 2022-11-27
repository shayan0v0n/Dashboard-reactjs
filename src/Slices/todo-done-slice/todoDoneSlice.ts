import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type todoStructure = { title: string, _id: string };
interface DoneTodoInterface {
    "_id": string,
    "title": string,
    "createdAt": string,
    "updatedAt": string,
    "__v": number
}

export const doneApiSlice = createApi({
    reducerPath: 'doneListApi',
    baseQuery:fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/doneListTodo",
        prepareHeaders(headers) {
            return headers
        }
    }),
    tagTypes: ['DoneList'],
    endpoints(builder) {
        return {
            fetchDoneTodos: builder.query<DoneTodoInterface[], string|void> ({
                query() {
                    return `/`
                },
                providesTags: ['DoneList']
            }),
            deleteDoneTodo: builder.mutation({
                query: (id) => ({
                    url: `/${id}`,
                    method: 'DELETE'
                }),
                invalidatesTags: ['DoneList']
            }),
            addDoneTodo: builder.mutation({
                query: (newTodo: {title:string}) => ({
                    url: `/`,
                    method: 'POST',
                    body: newTodo
                }),
                invalidatesTags: ['DoneList']
            }),
            updateDoneTodo: builder.mutation({
                query(data: {id:string, body:{title:string}}) {
                    const { id, body } = data
                    return {
                      url: `/${id}`,
                      method: 'PATCH',
                      body,
                    }
                },
                invalidatesTags: ['DoneList']
            })
        }
    }
})

export const { useFetchDoneTodosQuery, useDeleteDoneTodoMutation, useAddDoneTodoMutation, useUpdateDoneTodoMutation } = doneApiSlice;