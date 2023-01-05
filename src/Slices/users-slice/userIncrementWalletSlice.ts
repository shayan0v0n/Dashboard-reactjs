import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface userIncrementWallet {
    "_id":string
    "title":string
    "createdAt": string
    "updatedAt": string
    "__v": number
}


export const userIncrementWalletSlice = createApi({
    reducerPath: 'userIncrementWalletApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/api/users',
        prepareHeaders(headers) {
            return headers
        },
    }),
    tagTypes: ['userIncWallet'],
    endpoints(builder) {
        return {
            fetchUserIncrementWallet: builder.query<userIncrementWallet[], string|void> ({
                query:(userId) => {
                    return `/${userId}/incomeWallet`
                },
                providesTags: ['userIncWallet']
            }),
            addIncrementWallet: builder.mutation({
                query(data:{userId:string, incId:string}) {
                    const {userId,incId} = data
                    return {
                        url: `/${userId}/add-incomeWallet/${incId}`,
                        method: 'PATCH'
                    }
                },
                invalidatesTags: ['userIncWallet']
            }),
            removeIncrementWallet: builder.mutation({
                query(data:{userId:string, incId:string}) {
                    const {userId, incId} = data
                    return {
                        url: `/${userId}/remove-incomeWallet/${incId}`,
                        method: 'PATCH'
                    }
                },
                invalidatesTags: ['userIncWallet']
            })
        }
    }
})

export const {useFetchUserIncrementWalletQuery, useAddIncrementWalletMutation, useRemoveIncrementWalletMutation} = userIncrementWalletSlice