import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type walletIncomeStructure = { title:string, value:number }
interface WalletIncomeInterface {
    "_id": string,
    "title": string,
    "value": number,
    "createdAt": string,
    "updatedAt": string,
    "__v": number
}

export const walletIncomeApiSlice = createApi({
    reducerPath: 'walletIncomeApi',
    baseQuery:fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/incomeWallet",
        prepareHeaders(headers) {
            return headers
        }
    }),
    tagTypes: ['WalletIncome'],
    endpoints(builder) {
        return {
            fetchWalletIncome: builder.query<WalletIncomeInterface[], string|void> ({
                query: () => '/',
                providesTags: ['WalletIncome']
            }),
            deleteWalletIncome: builder.mutation({
                query: (id:string) => ({
                    url: `/${id}`,
                    method: 'DELETE'
                }),
                invalidatesTags: ['WalletIncome']
            }),
            addWalletIncome: builder.mutation({
                query: (newIncome: walletIncomeStructure) => ({
                    url: '/',
                    method: 'POST',
                    body: newIncome
                }),
                invalidatesTags: ['WalletIncome']
            }),
            updateWalletIncome: builder.mutation({
                query(data: {id:string, body:walletIncomeStructure}) {
                    const { id, body } = data;
                    return {
                        url: `/${id}`,
                        method: 'PATCH',
                        body
                    }
                },
                invalidatesTags: ['WalletIncome']
            })
        }
    }
})

export const { useFetchWalletIncomeQuery, useDeleteWalletIncomeMutation, useUpdateWalletIncomeMutation, useAddWalletIncomeMutation } = walletIncomeApiSlice