import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface userSpendWallet {
    "_id":string
    "title":string
    "createdAt": string
    "updatedAt": string
    "__v": number
}


export const userSpendWalletSlice = createApi({
    reducerPath: 'userSpendWalletApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/api/users',
        prepareHeaders(headers) {
            return headers
        },
    }),
    tagTypes: ['userSpendWallet'],
    endpoints(builder) {
        return {
            fetchUserSpendWallet: builder.query<userSpendWallet[], string|void> ({
                query:(userId) => {
                    return `/${userId}/spendWallet`
                },
                providesTags: ['userSpendWallet']
            }),
            addSpendWallet: builder.mutation({
                query(data:{userId:string, spdId:string}) {
                    const {userId,spdId} = data
                    return {
                        url: `/${userId}/add-spendWallet/${spdId}`,
                        method: 'PATCH'
                    }
                },
                invalidatesTags: ['userSpendWallet']
            }),
            removeSpendWallet: builder.mutation({
                query(data:{userId:string, spdId:string}) {
                    const {userId, spdId} = data
                    return {
                        url: `/${userId}/remove-spendWallet/${spdId}`,
                        method: 'PATCH'
                    }
                },
                invalidatesTags: ['userSpendWallet']
            })
        }
    }
})

export const {useFetchUserSpendWalletQuery, useAddSpendWalletMutation, useRemoveSpendWalletMutation} = userSpendWalletSlice