
import { createSlice } from "@reduxjs/toolkit";
import type { PostType } from "../types/postType";



type PostState = {
  posts: PostType[];
};

const initialState: PostState ={
    posts:[]
}


export const postSlice=createSlice({
    name:"posts",
    initialState,
    reducers:{
        addPost:(state,action)=>{
            state.posts.push(action.payload)
        }
    }
})


export const {addPost} =postSlice.actions

export default postSlice.reducer