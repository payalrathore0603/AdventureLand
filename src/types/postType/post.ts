import type { MediaItem } from "./media";

export interface Post{
    author_name:string;
    avatar?:string;
    timestamp:string;
    title:string;
    postMedia?:MediaItem[];
    likeCount:number;
    comments:string[]
}