import { MoreHorizontal } from "lucide-react";

interface PostHeaderProps {
  author_name: string;
  avatar?: string;
  timestamp: string;
}

export default function PostHeader({
  author_name,
  avatar,
  timestamp,
}: PostHeaderProps) {
  return (
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
            {timestamp} • @{author_name.toLowerCase().replace(/\s+/g, "")}
          </p>
        </div>
      </div>
      <button className="post-card__more-btn" aria-label="More options">
        <MoreHorizontal size={20} />
      </button>
    </div>
  );
}
