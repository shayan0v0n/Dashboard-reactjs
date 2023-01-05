import { configureStore } from "@reduxjs/toolkit";
import { noteListApiSlice } from "../Slices/note-slice/noteSlice";
import { passwordSaverSlice } from "../Slices/password-saver-slice/passwordSaverSlice";
import { searchSlice } from "../Slices/search-slice/searchSlice";
import {activeApiSlice} from "../Slices/todo-active-slice/todoActiveSlice";
import { doneApiSlice } from "../Slices/todo-done-slice/todoDoneSlice";
import { urlApiSlice } from "../Slices/urls-slice/urlsSplice";
import { walletIncomeApiSlice } from "../Slices/wallet-income-slice/walletIncomeSlice";
import { walletSpendApiSlice } from "../Slices/wallet-spend-slice/walletSpendSlice";
import { userApiSlice } from "../Slices/users-slice/usersSlice";
import { userNoteListSlice } from "../Slices/users-slice/userNoteListSlice";
import { userUrlsSplice } from "../Slices/users-slice/userUrlsSlice";
import { userPasswordSlice } from "../Slices/users-slice/userPasswordSlice";
import { userActiveTodoSlice } from "../Slices/users-slice/userActiveTodoSlice";
import { userDoneTodoSlice } from "../Slices/users-slice/userDoneTodoSlice";
import { userIncrementWalletSlice } from "../Slices/users-slice/userIncrementWalletSlice";
import { userSpendWalletSlice } from "../Slices/users-slice/userSpendWalletSlice";

export const store = configureStore({
    reducer: {
        [activeApiSlice.reducerPath]: activeApiSlice.reducer,
        [doneApiSlice.reducerPath]: doneApiSlice.reducer,
        [urlApiSlice.reducerPath]: urlApiSlice.reducer,
        [passwordSaverSlice.reducerPath]: passwordSaverSlice.reducer,
        [walletIncomeApiSlice.reducerPath]: walletIncomeApiSlice.reducer,
        [walletSpendApiSlice.reducerPath]: walletSpendApiSlice.reducer,
        [noteListApiSlice.reducerPath]: noteListApiSlice.reducer,
        [searchSlice.reducerPath]: searchSlice.reducer,
        [userApiSlice.reducerPath]: userApiSlice.reducer,
        [userNoteListSlice.reducerPath]: userNoteListSlice.reducer,
        [userUrlsSplice.reducerPath]: userUrlsSplice.reducer,
        [userPasswordSlice.reducerPath]: userPasswordSlice.reducer,
        [userActiveTodoSlice.reducerPath]: userActiveTodoSlice.reducer,
        [userDoneTodoSlice.reducerPath]: userDoneTodoSlice.reducer,
        [userIncrementWalletSlice.reducerPath]: userIncrementWalletSlice.reducer,
        [userSpendWalletSlice.reducerPath]: userSpendWalletSlice.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(activeApiSlice.middleware)
            .concat(doneApiSlice.middleware)
            .concat(urlApiSlice.middleware)
            .concat(passwordSaverSlice.middleware)
            .concat(userPasswordSlice.middleware)
            .concat(walletIncomeApiSlice.middleware)
            .concat(walletSpendApiSlice.middleware)
            .concat(noteListApiSlice.middleware)
            .concat(searchSlice.middleware)
            .concat(userApiSlice.middleware)
            .concat(userNoteListSlice.middleware)
            .concat(userUrlsSplice.middleware)
            .concat(userActiveTodoSlice.middleware)
            .concat(userDoneTodoSlice.middleware)
            .concat(userIncrementWalletSlice.middleware)
            .concat(userSpendWalletSlice.middleware)
    }
})

export type appDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>