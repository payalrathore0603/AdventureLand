import { useNavigate } from "react-router-dom";
import type { PostType } from "../../types/postType";
import Post from "./PostCard";
import type { RootState } from "../../app/store";
import { useAppSelector } from "../../app/hook";



export default function SocialMedia() {
  const navigate=useNavigate();
  const posts =useAppSelector((store: RootState )=>store.posts.posts)

console.log("posts",posts)

const handleCreatepost=()=>{
  navigate("/createPost")
}

  return (
   <div className="relative  min-h-screen">

     <div className='pt-6'>
        {posts.map((post:PostType)=>(
          <Post key={post.id} post={post} />
        ))}
      </div>
        
     
      <div className="w-12 h-12 rounded-full border border-gray-500 flex items-center justify-center bottom-2 right-4 fixed cursor-pointer" >
        <button onClick={handleCreatepost} className="text-2xl">+</button> 
      </div>

   </div>

  )
}
