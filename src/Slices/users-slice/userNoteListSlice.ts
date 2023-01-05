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

export const userNoteListSlice = createApi({
    reducerPath: 'userNoteListApi',
    baseQuery:fetchBaseQuery({
        baseUrl: 'http://localhost:8000/api/users',
        prepareHeaders(headers) {
            return headers
        }
    }),
    tagTypes: ['userNoteList'],
    endpoints(builder) {
        return {
            fetchUserNoteList: builder.query<noteListInterface[], string|void> ({
                query: (userId:string) => {
                    return `/${userId}/noteList`
                },
                providesTags: ['userNoteList']
            }),
            addUserNoteList: builder.mutation({
                query(data: {userId:string, noteId:string}) {
                    const {userId, noteId} = data
                    return {
                        url: `/${userId}/add-note/${noteId}`,
                        method: "PATCH"
                    }
                },
                invalidatesTags: ['userNoteList']
            }),
            removeUserNoteList: builder.mutation({
                query(data: {userId:string, noteId:string}) {
                    const {userId, noteId} = data
                    return {
                        url: `/${userId}/remove-note/${noteId}`,
                        method: "PATCH"
                    }
                },
                invalidatesTags: ['userNoteList']
            })
        }
    }
})

export const { useFetchUserNoteListQuery, useAddUserNoteListMutation, useRemoveUserNoteListMutation } = userNoteListSlice