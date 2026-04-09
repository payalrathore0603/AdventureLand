import { createSlice } from "@reduxjs/toolkit"
import type { userType } from "../../types/UserType"

type userState={
    users: userType[]
}

const initialState: userState ={
    users:[]
} 


export const userSlice=createSlice({
    name:"users",
    initialState,
    reducers:{
        addUser:(state,action)=>{
            const userData=action.payload;
            console.log(userData)
            const newUser={
                ...userData,
                avatar: userData.avatar instanceof File ? URL.createObjectURL(userData.avatar) : ""
            }
            console.log("newuser", newUser,userData)
            // state.users.push(newUser)
        }
    }
})


export const {addUser} =userSlice.actions
export default userSlice.reducer