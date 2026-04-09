import React, { useState } from "react";
import { useAppDispatch } from "../../app/hook";
import { addPost } from "../../features/posts/PostSlice";
import { useNavigate } from "react-router-dom";


export default function Signup() {

    interface UserFormType{
    name:string,
    email:string,
    phone:string,
    address:string,
    password:string,
    avatar:File | null
    }

    const [userDetails,setUserDetails]=useState<UserFormType>({
        name:"",
        email:"",
        phone:"",
        address:"",
        password:"",
        avatar: null
    })
    const dispatch=useAppDispatch()
    const naviage=useNavigate()

    const confirmPassword=""

    const handleOnChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value} =e.target

        if(e.target.type=="file"){
            const file=e.target.files?.[0] || null;

             if(name==="avatar"){
              setUserDetails(prev=>({
                ...prev,
                avatar:file
            }))
        }
        return;
        }

        setUserDetails({...userDetails,[name]:value})

       

    }

    const handelFormSubmit=(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        console.log(userDetails);
        dispatch(addPost(userDetails))
        naviage("/login")
    }

  return (
    <div className="min-h-screen flex justify-center items-center">

       <div className="border-2 shadow-md border-gray-300 rounded-sm m-4 p-4  ">
            <h1 className="text-center mb-2 underline-offset-2">create your account</h1>

           <form onSubmit={handelFormSubmit}>
                
                <div>
                    <input type="text" name="name" value={userDetails.name} onChange={handleOnChange} placeholder="Name" />
                    <input type="text" name="email" value={userDetails.email} onChange={handleOnChange} placeholder="Email" />
                </div>

                 <div>
                    <input type="text" name="address" value={userDetails.address} onChange={handleOnChange} placeholder="Address" />
                    <input type="text" name="phone" value={userDetails.phone} onChange={handleOnChange} placeholder="Phone no." />
                </div>

                 <div>
                    <input type="text" name="password" value={userDetails.password} onChange={handleOnChange} placeholder="Create Password" />
                    <input type="text" name="confirmPassword" value={confirmPassword} onChange={handleOnChange} placeholder="Confirm Password" />
                </div>

                <div>
                    <input type="file" name="avatar"  onChange={handleOnChange} placeholder="Upload Profile" />
                </div>

                <div className="text-center mt-2">
                    <button className="" type="submit">Submit</button>
                </div>

           </form>
       </div>

    </div>
  )
} 
