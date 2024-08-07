export interface VideoItem {
  kind: string;
  etag: string;
  id: IdField | string;
  snippet: Snippet;
  statistics: Statistics;
}

export interface YouTubeInterface {
  kind: string;
  etag: string;
  pageInfo: PageInfo;
  items: VideoItem[];
}

interface IdField {
  kind: string;
  videoId: string;
}

interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

interface Thumbnails {
  default: Thumbnail;
  medium: Thumbnail;
  high: Thumbnail;
  standard: Thumbnail;
  maxres: Thumbnail;
}

interface Localized {
  title: string;
  description: string;
}

interface Snippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  tags: string[];
  categoryId: string;
  liveBroadcastContent: string;
  localized: Localized;
  defaultAudioLanguage: string;
}

interface Statistics {
  viewCount: string;
  likeCount: string;
  dislikeCount: string;
  favoriteCount: string;
  commentCount: string;
}

interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}
