import { configureStore } from "@reduxjs/toolkit";
import postReducers from '../features/PostSlice'

export const store=configureStore({
    reducer:{
        posts:postReducers
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;