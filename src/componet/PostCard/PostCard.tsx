import { useEffect, useRef, useState } from "react";
import type { Post } from "../../types/postType/post";
import PostHeader from "./PostHeader";
import PostActions from "./PostActions";
import PostMediaVedio from "./PostMediaVedio";
import CommentBox from "./CommentBox";

export default function PostCard({
  author_name,
  avatar,
  timestamp,
  title,
  postMedia = [],
  likeCount,
  comments,
}: Post) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRefs = useRef<Map<number, HTMLVideoElement>>(new Map());

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [playingVideoIndex, setPlayingVideoIndex] = useState<number | null>(
    null,
  );
  const [isLike, setIsLike] = useState(false);
  const [newLikeCount, setNewLikeCount] = useState(likeCount);
  const [showComment, setShowComment] = useState(false);

  function handlePauseAllVideos() {
    videoRefs.current.forEach((video) => video.pause());
    setPlayingVideoIndex(null);
  }

  function handlePlayCurrentSlide(index: number) {
    const media = postMedia[index];

    if (!media || (media.type !== "video" && media.type !== "mp4")) {
      return;
    }

    handlePauseAllVideos();

    const activeVideo = videoRefs.current.get(index);
    if (activeVideo) {
      activeVideo
        .play()
        .then(() => setPlayingVideoIndex(index))
        .catch((err) => console.log("Autoplay blocked:", err));
    }
  }

  useEffect(() => {
    if (postMedia.length === 0 || !containerRef.current) return;
    // console.log("containerRef.current", containerRef.current);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            handlePlayCurrentSlide(currentSlide);
          } else {
            handlePauseAllVideos();
          }
        });
      },
      { threshold: 0.6 },
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [currentSlide, postMedia]);

  const slideLeft = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentSlide > 0) {
      const nextIndex = currentSlide - 1;
      setCurrentSlide(nextIndex);
      handlePlayCurrentSlide(nextIndex);
    }
  };

  const slideRight = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentSlide < postMedia.length - 1) {
      const nextIndex = currentSlide + 1;
      setCurrentSlide(nextIndex);
      handlePlayCurrentSlide(nextIndex);
    }
  };

  const togglePlayPause = (index: number) => {
    const targetVideo = videoRefs.current.get(index);
    if (!targetVideo) return;

    if (playingVideoIndex === index) {
      targetVideo.pause();
      setPlayingVideoIndex(null);
    } else {
      targetVideo.play();
      setPlayingVideoIndex(index);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newMuteState = !isMuted;
    setIsMuted(newMuteState);
    videoRefs.current.forEach((video) => {
      video.muted = newMuteState;
    });
  };

  const handlelike = () => {
    const willBeLike = !isLike;
    setIsLike(willBeLike);
    setNewLikeCount((currentCount) =>
      willBeLike ? currentCount + 1 : currentCount - 1,
    );
  };

  return (
    <article
      className={`post-card ${showComment ? "with-comments" : ""}`}
      ref={containerRef}
    >
      {/* LEFT COLUMN: Main Post Content & Controls */}
      <div className="post-main-content">
        <PostHeader
          author_name={author_name}
          avatar={avatar}
          timestamp={timestamp}
        />

        <p className="post-card__text">{title}</p>

        {postMedia.length > 0 && (
          <PostMediaVedio
            postMedia={postMedia}
            currentSlide={currentSlide}
            onSlideLeft={slideLeft}
            onSlideRight={slideRight}
            onTogglePlayPause={togglePlayPause}
            videoRefs={videoRefs}
            isMuted={isMuted}
            onToggleMute={toggleMute}
            playingVideoIndex={playingVideoIndex}
          />
        )}

        {/* Global Post Action Matrix Buttons Row */}
        {/* ------------ */}
        <PostActions
          isLike={isLike}
          commentCount={comments.length || 0}
          likeCount={newLikeCount}
          onLike={handlelike}
          onComment={() => setShowComment((prev) => !prev)}
        />
        {/* ----------------- */}
      </div>

      {/* RIGHT COLUMN (DESKTOP) / BOTTOM SHEET (MOBILE): Balanced Content Panel */}
      {/* INSTAGRAM-STYLE COMMENT MODAL */}
      {showComment && (
        <CommentBox
          author_name={author_name}
          avatar={avatar}
          timestamp={timestamp}
          title={title}
          postMedia={postMedia}
          currentSlide={currentSlide}
          comments={comments}
          likeCount={newLikeCount}
          isLike={isLike}
          onLikeToggle={handlelike}
          onClose={() => setShowComment(false)}
        />
      )}
    </article>
  );
}
