import { useState } from "react";
import type { PostFormType } from "../../types/PostFormType";
import { useAppDispatch } from "../../app/hook";
import { addPost } from "../../features/posts/PostSlice";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [form, setForm] = useState<PostFormType>({
    title: "",
    description: "",
    category: "",
    user: {
      name: "",
      avatar: null,
    },
    image: null,
  });

  const dispatch=useAppDispatch()
  const navigate=useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.type == "file") {
      const files = e.target.files ? Array.from(e.target.files) : []; //safe access

      if (name === "avatar") {
        setForm((prev) => ({
          ...prev,
          user: {
            ...prev.user,
            avatar: files[0] || null,
          },
        }));
      } else if (name === "image") {
        setForm((prev) => ({
          ...prev,
          image: files
        }));
      }

      return;
    }

    console.log("e.target", e.target);
    if (name === "name") {
      setForm({
        ...form,
        user: {
          ...form.user,
          name: value,
        },
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("handle form submit", form);
     dispatch(addPost(form))
     navigate('/')
    
  };
  return (
    <div className="flex justify-center items-center flex-col min-h-screen ">
      <form
        onSubmit={handleSubmit}
        className="border border-gray-200 p-4 w-1/2 shadow-md"
      >
        <h1 className="text-center mb-6 font-semibold underline underline-offset-2">
          Create Post
        </h1>

        <div className="mb-3">
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            className="w-1/2 mr-4 border-b-2 border-gray-400 outline-none"
            onChange={handleChange}
          />
          <select name="category" id="category" onChange={handleChange} className="border-b-2 border-gray-400 outline-none w-1/3 text-center">
            <option value="travel">Travel</option>
            <option value="bike">Bike</option>
            <option value="book">Book</option>
          </select>
        </div>

         <div className="mb-3">
            <input
              type="text"
              name="description"
              id="description"
              placeholder="Description"
              onChange={handleChange}
            
              className="w-1/2 mr-4 border-b-2 border-gray-400 outline-none"
            />

            <input
            type="file"
            accept="image/*"
            name="image"
            multiple
            onChange={handleChange}
            className="border-b-2outline-none"
          />
        </div>


        <div className=" mb-3">
          <h1 className="text-center mb-6 underline underline-offset-2">User Details</h1>
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={handleChange}
            className="w-1/2 mr-4 border-b-2 border-gray-400 outline-none"
          />
          
          <input
            type="file"
            name="avatar"
            accept="image/*"
            placeholder="Avatar Image"
            onChange={handleChange}
          />

        </div>
       
       <div className="text-center mt-4">
        <button className="border border-black m-1 p-2 rounded-md hover:bg-gray-200" type="submit">
          Submit
        </button>
       </div>
      </form>
    </div>
  );
}
