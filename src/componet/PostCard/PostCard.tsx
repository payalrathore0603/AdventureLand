import { useEffect, useRef, useState } from "react";
import {
  Volume2,
  VolumeX,
  Play,
  ChevronLeft,
  ChevronRight,
  Heart,
  MessageCircle,
  Share2,
} from "lucide-react";
import type { Post } from "../../types/postType/post";
import PostHeader from "./PostHeader";

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
  // const [newComment, setnewComment] = useState("");

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
          <div className="media-wrapper">
            {currentSlide > 0 && (
              <button className="carousel-arrow arrow-left" onClick={slideLeft}>
                <ChevronLeft size={20} />
              </button>
            )}
            {currentSlide < postMedia.length - 1 && (
              <button
                className="carousel-arrow arrow-right"
                onClick={slideRight}
              >
                <ChevronRight size={20} />
              </button>
            )}

            <div
              className="media-track"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {postMedia.map((media, index) => (
                <div key={index} className="media-slide">
                  {media.type === "img" || media.type === "image" ? (
                    <img
                      src={media.url}
                      alt="Uploaded post element attachment"
                      className="responsive-media"
                    />
                  ) : (
                    <div
                      className="video-container"
                      onClick={() => togglePlayPause(index)}
                    >
                      <video
                        ref={(el) => {
                          if (el) videoRefs.current.set(index, el);
                          else videoRefs.current.delete(index);
                        }}
                        className="responsive-media"
                        loop
                        playsInline
                        muted={isMuted}
                        crossOrigin="anonymous"
                      >
                        <source src={media.url} />
                      </video>

                      <button
                        className="video-control-btn mute-btn"
                        onClick={toggleMute}
                      >
                        {isMuted ? (
                          <VolumeX size={16} />
                        ) : (
                          <Volume2 size={16} />
                        )}
                      </button>

                      {playingVideoIndex !== index && (
                        <div className="video-play-overlay">
                          <Play size={32} fill="white" color="white" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {postMedia.length > 1 && (
              <div className="carousel-dots-indicator">
                {postMedia.map((_, index) => (
                  <span
                    key={index}
                    className={`dot ${currentSlide === index ? "active-dot" : ""}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Global Post Action Matrix Buttons Row */}
        {/* ------------ */}
        <div className="post-card__actions">
          <button
            type="button"
            className="post-card__action-btn post-card__action-btn--like"
            onClick={handlelike}
          >
            <Heart
              className="icon-nav"
              color={isLike ? "#ed4956" : "currentColor"}
              fill={isLike ? "#ed4956" : "none"}
            />
            <span className="mobile-hidden">Like</span>
            <span>{newLikeCount}</span>
          </button>

          <button
            type="button"
            className="post-card__action-btn post-card__action-btn--comment"
            onClick={() => setShowComment((prev) => !prev)}
          >
            <MessageCircle className="icon-nav" />
            <span className="mobile-hidden">Comment</span>
            <span>{comments?.length || 0}</span>
          </button>

          <button
            type="button"
            className="post-card__action-btn post-card__action-btn--share"
          >
            <Share2 className="icon-nav" />
            <span className="mobile-hidden">Share</span>
          </button>
        </div>
        {/* ----------------- */}
      </div>

      {/* RIGHT COLUMN (DESKTOP) / BOTTOM SHEET (MOBILE): Balanced Content Panel */}
      {/* INSTAGRAM-STYLE COMMENT MODAL */}
      {/* {showComment && (<CommentBox  
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
        /> )} */}
    </article>
  );
}
