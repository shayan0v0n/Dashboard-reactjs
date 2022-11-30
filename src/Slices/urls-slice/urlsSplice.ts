import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type urlStructure = { name:string, address:string }

interface UrlsInterface {
    "_id": string
    "name": string
    "address": string
    "createdAt": string
    "updatedAt": string
    "__v": number
}

export const urlApiSlice = createApi({
    reducerPath: 'urlApi',
    baseQuery:fetchBaseQuery({
        baseUrl: 'http://localhost:8000/api/urls',
        prepareHeaders(headers) {
            return headers
        }
    }),
    tagTypes: ['UrlList'],
    endpoints(builder) {
        return {
            fetchUrlList: builder.query<UrlsInterface[], string|void> ({
                query() {
                    return '/'
                },
                providesTags: ['UrlList']
            }),
            deleteUrlList: builder.mutation({
                query: (id:string) => ({
                    url: `/${id}`,
                    method: 'DELETE'
                }),
                invalidatesTags: ['UrlList']
            }),
            addUrlList: builder.mutation({
                query: (newUrl: urlStructure) => ({
                    url: '/',
                    method: 'POST',
                    body: newUrl
                }),
                invalidatesTags: ['UrlList']
            }),
            updateUrlList: builder.mutation({
                query(data: {id:string, body: urlStructure}) {
                    const { id, body } = data
                    return {
                        url: `/${id}`,
                        method: 'PATCH',
                        body
                    }
                },
                invalidatesTags: ['UrlList']
            })
        }
    }
})

export const { useFetchUrlListQuery, useDeleteUrlListMutation, useAddUrlListMutation, useUpdateUrlListMutation } = urlApiSlice