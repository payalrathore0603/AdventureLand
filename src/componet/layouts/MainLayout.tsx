import {
  Home,
  MenuIcon,
  PackageSearch,
  User,
  UserSquare2Icon,
} from "lucide-react";
import "./style.css";
import LeftSideBar from "./LeftSideBar";
import { useEffect, useState } from "react";
import RigthSideBar from "./RigthSideBar";
import PostCard from "../PostCard/PostCard";
import { formatDistanceToNow } from "date-fns";
import type { MediaItem } from "../../types/postType/media";
import type { commentProps } from "../../types/postType/post";
import { Link, useNavigate } from "react-router-dom";

interface Post {
  _id: string;
  title: string;
  createdAt: string;
  likeCount: number;
  comments: commentProps[];
  userInfo: {
    name: string;
    profileImageUrl: string;
  };
  postMedia: MediaItem[];
}

interface User {
  coverImage: string;
  email: string;
  id: string;
  name: string;
  phone: string;
  profileImage: string;
}

function MainLayout() {
  const [openSideBar, setOpenSideBar] = useState(false);
  const [postList, setPostList] = useState<Post[]>([]);
  const storeUser = localStorage.getItem("user");
  const user: User | null = storeUser ? JSON.parse(storeUser) : null;
  const navigate = useNavigate();
  const handleMenuClick = () => {
    setOpenSideBar((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await fetch(
          `https://adventureland2-de6qaz57hq-uc.a.run.app/api/posts/nearby?lat=12.9716&long=77.5946&radius=2000&limit=10&currentUserId=697f528ceadfdade278b3f2d&cursor=eyJjcmVhdGVkQXQiOiIyMDI2LTA1LTE0VDE1OjA4OjI3LjUyN1oiLCJpZCI6IjZhMDVlNTZiMzA5YTkzNzRiYzdmNjcwMCJ9`,
        );
        const data = await response.json();
        console.log("data", data.posts);
        setPostList(data.posts || []);
      } catch (err) {
        console.log("post url error: >>", err);
      }
    };
    fetchPostData();
  }, []);

  return (
    <>
      <div className="app-layout">
        <nav className="navbar">
          <div className="navbar__left">
            <button
              className="navbar__toggel-btn"
              onClick={handleMenuClick}
              aria-label="Toggle navigation menu"
            >
              <MenuIcon className="icon-nav" />
            </button>
            <div className="navbar__logo">
              Adventure<span className="navbar__logo--accent">Land</span>
            </div>
          </div>

          <div className="navbar__right">
            <div className="navbar__nav-item mobile-hidden">Social Media</div>
            <div className="navbar__mobile-icon mobile-display desktop-hidden">
              <Home className="icon-nav" />
            </div>

            <div className="navbar__nav-item mobile-hidden">Tour Guide</div>
            <div className="navbar__mobile-icon mobile-display desktop-hidden">
              <UserSquare2Icon className="icon-nav" />
            </div>

            <div className="navbar__nav-item mobile-hidden">Package</div>
            <div className="navbar__mobile-icon mobile-display desktop-hidden">
              <PackageSearch className="icon-nav" />
            </div>
            <Link to="/login" className="navbar__nav-item mobile-hidden">
              {user?.name ? `${user?.name}` : "LogIn"}
            </Link>

            {user?.name && (
              <button
                className="navbar__nav-item mobile-hidden"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}

            <div className="navbar__mobile-icon mobile-display desktop-hidden">
              <User className="icon-nav" />
            </div>
          </div>
        </nav>

        <main className="content-container">
          <aside
            className={`left-side ${openSideBar ? "open-left-sidebar" : ""}`}
          >
            <LeftSideBar />
          </aside>

          <section className="feed-middle">
            {postList.map((post) => (
              <div key={post._id}>
                <PostCard
                  author_name={post.userInfo.name}
                  avatar={post.userInfo.profileImageUrl}
                  timestamp={formatDistanceToNow(new Date(post.createdAt), {
                    addSuffix: true,
                  })}
                  title={post.title}
                  postMedia={post.postMedia} // 👈 Passed complete media array over here
                  likeCount={post.likeCount}
                  comments={post.comments}
                />
              </div>
            ))}
          </section>

          <aside className="right-side">
            <RigthSideBar />
          </aside>
        </main>
      </div>
    </>
  );
}

export default MainLayout;
