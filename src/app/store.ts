import { configureStore } from "@reduxjs/toolkit";
import postReducers from '../features/posts/PostSlice'

export const store=configureStore({
    reducer:{
        posts:postReducers
    }
})

export type RootState = ReturnType<typeof store.getState>;  // return entire store
export type AppDispatch = typeof store.dispatch;