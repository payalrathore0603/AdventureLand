import { X, Heart, MessageCircle, Share2 } from "lucide-react";
import type { MediaItem } from "../../types/postType/media";
import type { commentProps } from "../../types/postType/post";
import { getTimeAgo } from "../../utility/date";

interface PostcommentProps {
  onClose: () => void;
  postMedia: MediaItem[];
  currentSlide: number;
  author_name: string;
  avatar?: string;
  comments: commentProps[];
  title: string;
  isLike: boolean;
  onLikeToggle: () => void;
  likeCount: number;
  timestamp: string;
}

export default function CommentBox({
  onClose,
  postMedia,
  currentSlide,
  author_name,
  avatar,
  comments,
  title,
  isLike,
  onLikeToggle,
  likeCount,
}: PostcommentProps) {
  const handleComment = () => {};
  return (
    <div>
      <div className="comment-overlay" onClick={onClose}>
        {/* Global close button outside the modal */}
        <button className="comment-global-close" onClick={onClose}>
          <X size={24} color="white" />
        </button>

        <aside
          className="comment-container"
          onClick={(e) => e.stopPropagation()}
        >
          {/* LEFT PANE: Post Media Asset (Takes full height) */}
          <div className="comment-media-pane">
            {postMedia.length > 0 ? (
              postMedia[currentSlide].type === "img" ||
              postMedia[currentSlide].type === "image" ? (
                <img
                  src={postMedia[currentSlide].url}
                  alt="Post media content"
                  className="comment-pane-media"
                />
              ) : (
                <video
                  src={postMedia[currentSlide].url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  className="comment-pane-media"
                />
              )
            ) : (
              <div className="comment-pane-placeholder">No Media</div>
            )}
          </div>

          {/* RIGHT PANE: Instagram Comments Area */}
          <div className="comment-details-pane">
            {/* 1. Header: User Info */}
            <div className="comment-pane-header">
              <img
                src={
                  avatar ||
                  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150"
                }
                alt={author_name}
                className="comment-pane-avatar"
              />
              <div>
                <p className="comment-pane-username">{author_name}</p>
                <p className="comment-pane-subtitle">
                  @{author_name.toLowerCase().replace(/\s+/g, "")}
                  {title}
                </p>
              </div>
            </div>

            {/* 2. Scrollable Thread Area */}
            <div className="comment-pane-thread">
              {/* Post Caption (Always stays at the top of the thread) */}

              {/* Dynamic Map of Comments */}
              {comments && comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment._id} className="comment-thread-item">
                    <img
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150"
                      alt="User avatar"
                      className="comment-pane-avatar"
                    />
                    <p className="comment-thread-text">
                      <span className="comment-bold-user">
                        {comment.userInfo.name}
                      </span>
                      <span className="commment">{comment.comment}</span>
                      <span>
                        <i>{getTimeAgo(comment.timeStamp)}</i>
                      </span>
                    </p>
                  </div>
                ))
              ) : (
                <div className="comment-empty-state">
                  <p>No comments yet.</p>
                  <span>Start the conversation!</span>
                </div>
              )}
            </div>

            {/* 3. Bottom Sticky Action & Input Field Box */}
            <div className="comment-pane-footer">
              <div className="comment-footer-actions">
                <Heart
                  size={22}
                  className="pointer"
                  color={isLike ? "#ed4956" : "currentColor"}
                  fill={isLike ? "#ed4956" : "none"}
                  onClick={onLikeToggle}
                />
                <MessageCircle size={22} />
                <Share2 size={22} />
              </div>
              <p className="comment-likes-count">{likeCount} likes</p>

              <form
                className="comment-input-form"
                onSubmit={(e) => e.preventDefault()}
              >
                <input type="text" placeholder="Add a comment..." />
                <button type="submit" onClick={handleComment}>
                  Post
                </button>
              </form>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
