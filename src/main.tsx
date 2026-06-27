import "./index.css";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId="363093585217-sasdb2o35bhhdmet76jr44qgl0k66flb.apps.googleusercontent.com">
    <RouterProvider router={router} />
  </GoogleOAuthProvider>,
);
