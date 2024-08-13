import { initionalVideoState, VideosState } from './video-state';

export interface AppState {
  videos: VideosState;
}

export const initialAppState: AppState = {
  videos: initionalVideoState,
};
