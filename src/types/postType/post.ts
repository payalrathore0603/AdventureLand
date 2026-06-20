import type { MediaItem } from "./media";

export interface Post{
    author_name:string;
    avatar?:string;
    timestamp:string;
    title:string;
    postMedia?:MediaItem[];
    likeCount:number;
    comments:commentProps[]
}


export interface commentProps {
  _id: number;
  userId: string;
  comment: string;
  timeStamp: string;
  likes: number[];
  dislikes: number[];
  userInfo: {
    name: string;
    profileImageUrl: string;
  };
}