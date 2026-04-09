import { configureStore } from "@reduxjs/toolkit";
import postReducers from '../features/posts/PostSlice'
import userReducers from '../features/user/UserSlice'

export const store=configureStore({
    reducer:{
        posts:postReducers,
        user:userReducers
    }
})

export type RootState = ReturnType<typeof store.getState>;  // return entire store
export type AppDispatch = typeof store.dispatch;