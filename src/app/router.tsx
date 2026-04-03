import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../componet/layouts/MainLayout";
import SocialMedia from "../componet/pages/SocialMedia";
import Services from "../componet/pages/Services";
import Login from "../componet/pages/Login";
import CreatePost from "../componet/pages/CreatePost";
import Signup from "../componet/pages/Signup";

export const router=createBrowserRouter([
    {
        path:"/",
        element:<MainLayout/>,
        children:[
            {
                index:true,
                element:<SocialMedia/>
            },
            {
                path:"/service",
                element:<Services/>
            },
            {
                path:"/login",
                element:<Login/>,
            },
            {
                path:"/signup",
                element:<Signup/>
            }
        ]
    },
    {
        path:'/createPost',
        element:<CreatePost/>
    }
])