import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../componet/layouts/MainLayout";
import CreatePost from "../componet/pages/CreatePost";
import Login from "../componet/Auth/Login";
import Signup from "../componet/Auth/Signup";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    // children:[
    //     {
    //         index:true,
    //         element:<SocialMedia/>
    //     },
    //     {
    //         path:"/service",
    //         element:<Services/>
    //     },
    //     {
    //         path:"/login",
    //         element:<Login/>,
    //     },
    //     {
    //         path:"/signup",
    //         element:<Signup/>
    //     }
    // ]
  },
  {
    path: "/createPost",
    element: <CreatePost />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);
