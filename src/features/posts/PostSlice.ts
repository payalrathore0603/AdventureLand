

import { createSlice } from "@reduxjs/toolkit";
import type { PostType } from "../../types/postType";



type PostState = {
  posts: PostType[];
};

const initialState: PostState ={
  posts : [
  {
    id: 1,
    title: "Morning Coffee ☕",
    description: "Starting the day with a fresh cup of coffee.",
    category: "Food",
    image: [
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085"
    ],
    likes: 12,
    isLiked: false,
    isSaved: false,
    user: {
      name: "Aman",
      avatar: "https://i.pravatar.cc/150?img=1"
    }
  },
  {
    id: 2,
    title: "Bike ride in Delhi 🏍️",
    description: "Evening ride with cool breeze and great roads.",
    category: "Bike",
    image: [
      "https://images.unsplash.com/photo-1518655048521-f130df041f66",
      "https://images.unsplash.com/photo-1502877338535-766e1452684a",
      "https://images.unsplash.com/photo-1493238792000-8113da705763"
    ],
    likes: 8,
    isLiked: false,
    isSaved: false,
    user: {
      name: "Rahul",
      avatar: "https://i.pravatar.cc/150?img=2"
    }
  },
  {
    id: 3,
    title: "Sunset View 🌅",
    description: "Beautiful sunset at the beach.",
    category: "Travel",
    image: [
      "https://images.unsplash.com/photo-1501973801540-537f08ccae7b"
    ],
    likes: 20,
    isLiked: false,
    isSaved: false,
    user: {
      name: "Neha",
      avatar: "https://i.pravatar.cc/150?img=3"
    }
  },
  {
    id: 4,
    title: "Mountain Trek ⛰️",
    description: "Adventure trekking experience.",
    category: "Travel",
    image: [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
    ],
    likes: 30,
    isLiked: false,
    isSaved: false,
    user: {
      name: "Karan",
      avatar: "https://i.pravatar.cc/150?img=7"
    }
  },
  {
    id: 5,
    title: "Beach Vibes 🏖️",
    description: "Relaxing near the ocean.",
    category: "Travel",
    image: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      "https://images.unsplash.com/photo-1473116763249-2faaef81ccda",
      "https://images.unsplash.com/photo-1493558103817-58b2924bce98"
    ],
    likes: 28,
    isLiked: false,
    isSaved: false,
    user: {
      name: "Ankit",
      avatar: "https://i.pravatar.cc/150?img=10"
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