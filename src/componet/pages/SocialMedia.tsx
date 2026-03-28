import { useNavigate } from "react-router-dom";
import type { PostType } from "../../types/postType";
import Post from "./PostCard";



export default function SocialMedia() {
  const navigate=useNavigate();

  const posts = [
  {
    id: 1,
    title: "Trip to Manali 🏔️",
    description: "Amazing experience in the mountains with friends.",
    category: "Travel",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    likes: 12,
    isLiked: false,
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
    image: "https://images.unsplash.com/photo-1518655048521-f130df041f66",
    likes: 8,
    isLiked: false,
    isSaved: false,
    user: {
      name: "Rahul",
      avatar: "https://i.pravatar.cc/150?img=2"
    }
  }
];

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
