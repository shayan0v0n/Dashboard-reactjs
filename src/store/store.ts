import { configureStore } from "@reduxjs/toolkit";
import { noteListApiSlice } from "../Slices/note-slice/noteSlice";
import { passwordSaverSlice } from "../Slices/password-saver-slice/passwordSaverSlice";
import { searchSlice } from "../Slices/search-slice/searchSlice";
import {activeApiSlice} from "../Slices/todo-active-slice/todoActiveSlice";
import { doneApiSlice } from "../Slices/todo-done-slice/todoDoneSlice";
import { urlApiSlice } from "../Slices/urls-slice/urlsSplice";
import { walletIncomeApiSlice } from "../Slices/wallet-income-slice/walletIncomeSlice";
import { walletSpendApiSlice } from "../Slices/wallet-spend-slice/walletSpendSlice";

export const store = configureStore({
    reducer: {
        [activeApiSlice.reducerPath]: activeApiSlice.reducer,
        [doneApiSlice.reducerPath]: doneApiSlice.reducer,
        [urlApiSlice.reducerPath]: urlApiSlice.reducer,
        [passwordSaverSlice.reducerPath]: passwordSaverSlice.reducer,
        [walletIncomeApiSlice.reducerPath]: walletIncomeApiSlice.reducer,
        [walletSpendApiSlice.reducerPath]: walletSpendApiSlice.reducer,
        [noteListApiSlice.reducerPath]: noteListApiSlice.reducer,
        [searchSlice.reducerPath]: searchSlice.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
                .concat(activeApiSlice.middleware)
                    .concat(doneApiSlice.middleware)
                        .concat(urlApiSlice.middleware)
                            .concat(passwordSaverSlice.middleware)
                                .concat(walletIncomeApiSlice.middleware)
                                    .concat(walletSpendApiSlice.middleware)
                                        .concat(noteListApiSlice.middleware)
                                            .concat(searchSlice.middleware)
    }
})

export type appDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>