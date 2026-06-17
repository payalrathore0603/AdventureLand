import {
  ChevronLeft,
  ChevronRight,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";
import type { MediaItem } from "../../types/postType/media";

interface PostMediaProps {
  postMedia: MediaItem[];
  currentSlide: number;
  onSlideLeft: (e: React.MouseEvent) => void;
  onSlideRight: (e: React.MouseEvent) => void;
  onTogglePlayPause: (index: number) => void;
  videoRefs: { current: Map<number, HTMLVideoElement> };
  isMuted: boolean;
  onToggleMute: (e: React.MouseEvent) => void;
  playingVideoIndex: number | null;
}

export default function PostMediaVedio({
  postMedia,
  currentSlide,
  onSlideLeft,
  onSlideRight,
  onTogglePlayPause,
  videoRefs,
  isMuted,
  onToggleMute,
  playingVideoIndex,
}: PostMediaProps) {
  return (
    <>
      <div className="media-wrapper">
        {currentSlide > 0 && (
          <button className="carousel-arrow arrow-left" onClick={onSlideLeft}>
            <ChevronLeft size={20} />
          </button>
        )}
        {currentSlide < postMedia.length - 1 && (
          <button className="carousel-arrow arrow-right" onClick={onSlideRight}>
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
                  onClick={() => onTogglePlayPause(index)}
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
                    onClick={onToggleMute}
                  >
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
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
    </>
  );
}
