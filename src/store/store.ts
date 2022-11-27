import { configureStore } from "@reduxjs/toolkit";
import {activeApiSlice} from "../Slices/todo-active-slice/todoActiveSlice";
import { doneApiSlice } from "../Slices/todo-done-slice/todoDoneSlice";

export const store = configureStore({
    reducer: {
        [activeApiSlice.reducerPath]: activeApiSlice.reducer,
        [doneApiSlice.reducerPath]: doneApiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
                .concat(activeApiSlice.middleware)
                    .concat(doneApiSlice.middleware)
    }
})

export type appDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>