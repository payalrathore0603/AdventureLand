import { Link } from "react-router-dom";
import Profile from "./Profile"; // Corrected case matching

export default function LeftSideBar() {
  return (
    <div className="l-container">
      {/* User Information Profile Module Card */}
      <Profile />

      {/* Navigation Sublink Framework links */}
      <div className="l-active-links">
        <Link to="/">Message</Link>
        <Link to="/">Friends</Link>
        <Link to="/">Reel</Link>
        <Link to="/">Post</Link>
        <Link to="/">Setting</Link>
      </div>
    </div>
  );
}
