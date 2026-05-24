import { Heart, MessageCircle, MoreHorizontal, Share2 } from "lucide-react";

// 1. Explicitly defining the structural data type blueprint shape for your props
interface PostCardProps {
  author_name: string;
  avatar?: string; /* The ? means this parameter is optional */
  timestamp: string;
  title: string;
  url?: string; /* Optional parameter */
  type?: string;
  likeCount: number;
  comments: [];
}

// 2. Binding the interface signature type directly to your component parameters
export default function PostCard({
  author_name,
  avatar,
  timestamp,
  title,
  url,
  type,
  likeCount,
  comments,
}: PostCardProps) {
  return (
    <article className="post-card">
      {/* 1. Header Row Area */}
      <div className="post-card__header">
        <div className="post-card__user-meta">
          <div className="post-card__avatar-div">
            <img
              src={
                avatar ||
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150"
              }
              alt={`${author_name}'s avatar`}
              className="post-card__avatar"
            />
          </div>
          <div className="post-card__author-info">
            <p className="post-card__author-name">{author_name}</p>
            <p className="post-card__timestamp">
              {timestamp} • @{author_name}
            </p>
          </div>
        </div>
        <button className="post-card__more-btn" aria-label="More post options">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* 2. Main Content Post Area */}
      <p className="post-card__text">{title}</p>

      {/* Render the structural media div ONLY if a post image source is explicitly passed down */}
      {/* {image && (
        <div className="post-card__media-div">
          <img
            src={image}
            alt="Post attached upload media content"
            className="post-card__image"
          />
        </div>
      )} */}

      {type == "img" ? (
        <div className="post-card__media-div">
          <img
            src={url}
            alt="post attached upload media content"
            className="post-card__image"
          />
        </div>
      ) : (
        <div className="post-card__media-div">
          <video
            className="post-card__video"
            key={url}
            autoPlay
            muted
            loop
            playsInline
            crossOrigin="anonymous"
          >
            <source src={url}></source>
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {/* 3. Footer Interactive Actions Area */}
      <div className="post-card__actions">
        <button
          type="button"
          className="post-card__action-btn post-card__action-btn--like"
        >
          <Heart className="icon-nav" />
          <span>Like {likeCount} </span>
        </button>

        <button
          type="button"
          className="post-card__action-btn post-card__action-btn--comment"
        >
          <MessageCircle className="icon-nav" />
          <span>Comment {comments.length} </span>
        </button>

        <button
          type="button"
          className="post-card__action-btn post-card__action-btn--share"
        >
          <Share2 className="icon-nav" />
          <span>Share</span>
        </button>
      </div>
    </article>
  );
}
