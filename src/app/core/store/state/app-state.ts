import { initionalSearchWordState, SearchWordState } from './search-word-state';
import { initionalVideoState, VideosState } from './video-state';

export interface AppState {
  videos: VideosState;
  searchWord: SearchWordState;
}

export const initialAppState: AppState = {
  videos: initionalVideoState,
  searchWord: initionalSearchWordState,
};
