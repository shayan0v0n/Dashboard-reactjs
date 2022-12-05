import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type walletSpendStructure = { title:string, value:number }
interface WalletSpendInterface {
    "_id": string,
    "title": string,
    "value": number,
    "createdAt": string,
    "updatedAt": string,
    "__v": number
}

export const walletSpendApiSlice = createApi({
    reducerPath: 'walletSpendApi',
    baseQuery:fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/spendWallet",
        prepareHeaders(headers) {
            return headers
        }
    }),
    tagTypes: ['WalletSpend'],
    endpoints(builder) {
        return {
            fetchWalletSpend: builder.query<WalletSpendInterface[], string|void> ({
                query: () => '/',
                providesTags: ['WalletSpend']
            }),
            deleteWalletSpend: builder.mutation({
                query: (id:string) => ({
                    url: `/${id}`,
                    method: 'DELETE'
                }),
                invalidatesTags: ['WalletSpend']
            }),
            addWalletSpend: builder.mutation({
                query: (newSpend: walletSpendStructure) => ({
                    url: '/',
                    method: 'POST',
                    body: newSpend
                }),
                invalidatesTags: ['WalletSpend']
            }),
            updateWalletSpend: builder.mutation({
                query(data: {id:string, body:walletSpendStructure}) {
                    const { id, body } = data;
                    return {
                        url: `/${id}`,
                        method: 'PATCH',
                        body
                    }
                },
                invalidatesTags: ['WalletSpend']
            })
        }
    }
})

export const { useFetchWalletSpendQuery, useDeleteWalletSpendMutation, useUpdateWalletSpendMutation, useAddWalletSpendMutation } = walletSpendApiSlice