import { configureStore } from "@reduxjs/toolkit";
import { passwordSaverSlice } from "../Slices/password-saver-slice/passwordSaverSlice";
import {activeApiSlice} from "../Slices/todo-active-slice/todoActiveSlice";
import { doneApiSlice } from "../Slices/todo-done-slice/todoDoneSlice";
import { urlApiSlice } from "../Slices/urls-slice/urlsSplice";

export const store = configureStore({
    reducer: {
        [activeApiSlice.reducerPath]: activeApiSlice.reducer,
        [doneApiSlice.reducerPath]: doneApiSlice.reducer,
        [urlApiSlice.reducerPath]: urlApiSlice.reducer,
        [passwordSaverSlice.reducerPath]: passwordSaverSlice.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
                .concat(activeApiSlice.middleware)
                    .concat(doneApiSlice.middleware)
                        .concat(urlApiSlice.middleware)
                            .concat(passwordSaverSlice.middleware)
    }
})

export type appDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>