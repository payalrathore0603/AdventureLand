

import { createSlice } from "@reduxjs/toolkit";
import type { PostType } from "../../types/postType";



type PostState = {
  posts: PostType[];
};

const initialState: PostState ={
    posts:[
        {
    id: 1,
    title: "Trip to Manali 🏔️",
    description: "Amazing experience in the mountains with friends.",
    category: "Travel",
    image: ["https://images.unsplash.com/photo-1501785888041-af3ef285b470"],
    likes: 12,
    isLiked: true,
    isSaved: false,
    user: {
      name: "Payal",
      avatar: "https://i.pravatar.cc/150?img=1"
    }
  },
  {
    id: 2,
    title: "Bike ride in Delhi 🏍️",
    description: "Evening ride with cool breeze and great roads.",
    category: "Bike",
    image: ["https://images.unsplash.com/photo-1518655048521-f130df041f66"],
    likes: 8,
    isLiked: false,
    isSaved: false,
    user: {
      name: "Rahul",
      avatar: "https://i.pravatar.cc/150?img=2"
    }
  }
    ]
}


export const postSlice=createSlice({
    name:"posts",
    initialState,
    reducers:{
        addPost:(state,action)=>{
          const postData=action.payload
           const newPost= {
            ...postData,
             id:state.posts.length +1,
             likes: 0,
             isLiked: false,
             isSaved: false,
             image: Array.isArray(postData.image)? postData.image.map((file: File)=>file instanceof File ? URL.createObjectURL(file) : "") : [],
             user:{
              ...postData.user,
                avatar:postData.user.avatar instanceof File ? URL.createObjectURL(postData.user.avatar):""
             }
           }
           console.log(newPost)
            state.posts.push(newPost)
        },
       likePost:(state,action )=>{
        console.log("likepost start from here",action.payload)
        const post=state.posts.find(p=>p.id===action.payload)
        console.log("post",post)
          if(post){
            if(post.isLiked){
              post.likes -=1;
              post.isLiked=false;
            }else{
              post.likes +=1
              post.isLiked=true;
            }
          }
        }
    }
})


export const {addPost,likePost} =postSlice.actions

export default postSlice.reducer 