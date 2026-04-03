import { Link } from "react-router-dom";

export default function Login() {
  
  return (
    <div>
      <h1>Login</h1>
      <p>Don't have account? </p>
      <Link to="/signup" >create Account</Link>
    </div>
  )
}
