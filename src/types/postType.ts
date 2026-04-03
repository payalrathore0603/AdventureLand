export interface PostType{
    id:number,
    title:string,
    description:string,
    category:string,
    image:string[],
    likes:number,
    isLiked:boolean,
    isSaved:boolean,
    user:{
        name:string,
        avatar:string
    }
}