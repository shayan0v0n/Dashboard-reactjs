import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type noteListStructure = {
    title:string,
    shortDesc:string,
    text:string
}

interface noteListInterface {
    "_id": string
    "title": string
    "shortDesc": string
    "text": string
    "createdAt": string
    "updatedAt": string
    "__v": number
}

export const noteListApiSlice = createApi({
    reducerPath: 'noteList',
    baseQuery:fetchBaseQuery({
        baseUrl: 'http://localhost:8000/api/notes',
        prepareHeaders(headers) {
            return headers
        }
    }),
    tagTypes: ['NoteList'],
    endpoints(builder) {
        return {
            fetchNoteList: builder.query<noteListInterface[], string|void> ({
                query() {
                    return `/`
                },
                providesTags: ['NoteList']
            }),
            deleteNoteList: builder.mutation({
                query: (id:string) => ({
                    url: `/${id}`,
                    method: 'DELETE'
                }),
                invalidatesTags: ['NoteList']
            }),
            updateNoteList: builder.mutation({
                query(data: {id:string, body:noteListStructure }) {
                    const { id, body } = data
                    return {
                        url: `/${id}`,
                        method: 'PATCH',
                        body: body
                    }
                },
                invalidatesTags: ['NoteList']
            }),
            addNoteList: builder.mutation({
                query: (newNote:noteListStructure) => ({
                    url: '/',
                    method:'POST',
                    body:newNote
                }),
                invalidatesTags: ['NoteList']
            })
        }
    }
})

export const { useFetchNoteListQuery, useDeleteNoteListMutation, useAddNoteListMutation, useUpdateNoteListMutation } = noteListApiSlice