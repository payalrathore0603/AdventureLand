export interface PostFormType{
    title:string,
    description:string,
    category:string,
    image:File [] | null,
    user:{
        name:string,
        avatar:File | null
    }
}