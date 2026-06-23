import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { fetchBaseApi } from "../../utility/api";
import { GoogleLogin } from "@react-oauth/google";

interface userInfoProps {
  email: string;
  password: string;
}

export default function Login() {
  const [userInfo, setUserInfo] = useState<userInfoProps>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const fetchResponse = async () => {
      try {
        const response = await axios.post(`${fetchBaseApi()}/api/auth/login`, {
          email: userInfo.email,
          password: userInfo.password,
        });
        // console.log(response.status);
        const { token, user } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        if (response.status == 200) {
          navigate("/");
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchResponse();
    console.log("userInfo", userInfo);
  };

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
            <input
              className="input-feild"
              type="text"
              placeholder="Email"
              value={userInfo?.email || ""}
              name="email"
              onChange={handleChange}
            />
            <input
              className="input-feild"
              type="text"
              placeholder="Password"
              name="password"
              value={userInfo.password}
              onChange={handleChange}
            />
            <button className="input-feild button-field" onClick={handleClick}>
              Login
            </button>
          </form>
        </div>
        <div className="">
          <p>Forgotten password ?</p>
        </div>
        <div className="login-Social">
          <button className="input-feild button-field">
            Login with Facebook
          </button>
          <GoogleLogin
            onSuccess={(response) => {
              console.log("response", response);
              navigate("/");
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
          <button className="input-feild button-field">
            Login with Google
          </button>
          <button className="input-feild button-field">
            <Link to="/signup">Create an account</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
