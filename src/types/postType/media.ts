export type Mediatype= | "image" | "img" | "video" | "mp4";

export interface MediaItem {
  url: string;
  type: Mediatype;
}