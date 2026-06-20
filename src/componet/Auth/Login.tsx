import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { fetchBaseApi } from "../../utility/api";

interface userProps {
  id: string;
  name: string;
  email: string;
  phone: string;
  profileImage: string;
  coverImage: string;
}

interface userInfoProps {
  token: string;
  user: userProps;
}

export default function Login() {
  const [userInfo, setUserInfo] = useState<userInfoProps>();

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const response = await axios.post(`${fetchBaseApi()}/api/auth/login`, {
          email: "payalrathore0603@gamil.com",
          password: "12345678",
        });
        // console.log(response.data);
        setUserInfo(response.data);
        console.log(response.status);
      } catch (err) {
        console.log(err);
      }
    };
    fetchResponse();
  }, []);

  return (
    <div className="login-container">
      {}
      <div className="login-left">
        <h1 className="heading">NEXT TRAVEL</h1>
        <img
          src="https://images.unsplash.com/photo-1632130746510-922d81ad845d?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="login image loading"
          className="login-img"
        />
      </div>
      <div className="vertical-line "></div>

      <div className="login-right">
        <h1 className="heading">Login to AdventureLand </h1>
        <div className="">
          <form action="" className="login-form">
            <input className="input-feild" type="text" placeholder="Email" />
            <input className="input-feild" type="text" placeholder="Password" />
            <button className="input-feild button-field">Login</button>
          </form>
        </div>
        <div className="">
          <p>Forgotten password ?</p>
        </div>
        <div className="login-Social">
          <button className="input-feild button-field">
            {" "}
            Login with Facebook{" "}
          </button>
          <button className="input-feild button-field">
            <Link to="/signup">Create an account</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
