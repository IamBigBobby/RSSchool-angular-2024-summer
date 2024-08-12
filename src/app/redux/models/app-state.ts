import { VideoItem } from '../../core/services/you-tube-interface';

export interface AppState {
  currentVideos: VideosState;
}

export interface VideosState {
  videos: VideoItem[];
}
