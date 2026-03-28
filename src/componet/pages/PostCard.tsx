import type { PostType } from "../../types/postType";

type props = {
  post: PostType;
};

export default function PostCard({ post }: props) {
  const {
    id,
    title,
    description,
    category,
    likes,
    isLiked,
    isSaved,
    user,
    image,
  } = post;
  console.log(id, title, description, category, likes, isLiked, isSaved, user);
  return (
    <div className=" md:w-[50%] mx-auto p-4 border-black shadow-md mb-4">
      <div className="flex gap-4 mb-4">
        <div className="overflow-hidden w-12 h-12 border rounded-full">
          <img className="object-fill" src={user.avatar} alt="user profile" />
        </div>
        <div className="flex flex-col">
          <span>{user.name}</span>
          <span>{title}, {category}</span>
        </div>
      </div>

      <div>
        <img src={image} alt="post image" />
      </div>

      <div>
        <div className="flex justify-between">
          <div className="flex gap-4 mt-4">
            <span className="text-sm font-medium">
              <i>Likes {likes}</i>{" "}
            </span>
            <span className="text-sm font-medium">
              <i>Comments </i>
            </span>
            <span className="text-sm font-medium">
              <i>Share </i>
            </span>
          </div>
          <div>
            <span className="text-sm font-medium">
              <i>Save </i>
            </span>
          </div>
        </div>
        <div>
          <span className="mt-4 font-normal text-slate-600 text-sm">
            {description}
          </span>
        </div>
      </div>
    </div>
  );
}
