import { Home, MenuIcon, PackageSearch, UserSquare2Icon } from "lucide-react";
import "./style.css";
import LeftSideBar from "./LeftSideBar";
import { useEffect, useState } from "react";
import RigthSideBar from "./RigthSideBar";
import PostCard from "../pages/PostCard";
import { formatDistanceToNow } from "date-fns";

interface Post {
  _id: string;
  title: string;
  createdAt: string; // or Date, depending on your data
  likeCount: number;
  comments: []; // Replace 'any' with your actual comment type if you have one
  userInfo: {
    name: string;
    profileImageUrl: string;
  };
  postMedia: Array<{
    url: string;
    type: string;
  }>;
}

function MainLayout() {
  const [openSideBar, setOpenSideBar] = useState(false);
  const [postList, setPostList] = useState<Post[]>([]);

  const handleMenuClick = () => {
    setOpenSideBar((prev) => !prev);
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
        {/* Semantic accessibility navigation element header */}
        <nav className="navbar">
          {/* Navbar Left Panel */}
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

          {/* Navbar Right Actions Panel */}
          <div className="navbar__right">
            {/* Social Media Link Option */}
            <div className="navbar__nav-item mobile-hidden">Social Media</div>
            <div className="navbar__mobile-icon mobile-display desktop-hidden">
              <Home className="icon-nav" />
            </div>

            {/* TourGuide Link Option */}
            <div className="navbar__nav-item mobile-hidden">Tour Guide</div>
            <div className="navbar__mobile-icon mobile-display desktop-hidden">
              <UserSquare2Icon className="icon-nav" />
            </div>

            {/* Package Link Option */}
            <div className="navbar__nav-item mobile-hidden">Package</div>
            <div className="navbar__mobile-icon mobile-display desktop-hidden">
              <PackageSearch className="icon-nav" />
            </div>
          </div>
        </nav>

        {/* Central Workspace Grid Segment */}
        <main className="content-container">
          <aside
            className={`left-side ${openSideBar ? "open-left-sidebar" : ""}`}
          >
            <LeftSideBar />
          </aside>

          <section className="feed-middle">
            {/* Primary Main Application Content Stream Cards Go Here */}
            {postList.map((post) => {
              const media = post.postMedia?.[0];
              console.log("media", media);
              return (
                <div key={post._id}>
                  <PostCard
                    author_name={post.userInfo.name}
                    avatar={post.userInfo.profileImageUrl}
                    timestamp={formatDistanceToNow(new Date(post.createdAt), {
                      addSuffix: true,
                    })}
                    title={post.title}
                    url={media?.url}
                    type={media?.type}
                    likeCount={post.likeCount}
                    comments={post.comments}
                  />
                </div>
              );
            })}
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
