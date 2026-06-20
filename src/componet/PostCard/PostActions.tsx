import { Heart, MessageCircle, Share2 } from "lucide-react";

interface postActionsProps {
  isLike: boolean;
  likeCount: number;
  commentCount: number;
  onLike: () => void;
  onComment: () => void;
}

export default function PostActions({
  isLike,
  likeCount,
  commentCount,
  onLike,
  onComment,
}: postActionsProps) {
  return (
    <div className="post-card__actions">
      <button
        type="button"
        className="post-card__action-btn post-card__action-btn--like"
        onClick={onLike}
      >
        <Heart
          className="icon-nav"
          color={isLike ? "#ed4956" : "currentColor"}
          fill={isLike ? "#ed4956" : "none"}
        />
        <span className="mobile-hidden">Like</span>
        <span>{likeCount}</span>
      </button>

      <button
        type="button"
        className="post-card__action-btn post-card__action-btn--comment"
        onClick={onComment}
      >
        <MessageCircle className="icon-nav" />
        <span className="mobile-hidden">Comment</span>
        <span>{commentCount}</span>
      </button>

      <button
        type="button"
        className="post-card__action-btn post-card__action-btn--share"
      >
        <Share2 className="icon-nav" />
        <span className="mobile-hidden">Share</span>
      </button>
    </div>
  );
}
