import { initionalSearchWordState, SearchWordState } from './search-word-state';
import { initialSortVideosState, SortVideosState } from './sort-type-state';
import { initionalVideoState, VideosState } from './video-state';

export interface AppState {
  videos: VideosState;
  searchWord: SearchWordState;
  sortType: SortVideosState;
}

export const initialAppState: AppState = {
  videos: initionalVideoState,
  searchWord: initionalSearchWordState,
  sortType: initialSortVideosState,
};
