import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hook";

export default function Login() {
  
  const users=useAppSelector(store=>store.user)
  console.log(users?users:null)
  return (
    <div>
      <h1>Login</h1>
      <p>Don't have account? </p>
      <Link to="/signup" >create Account</Link>
     
    </div>
  )
}
