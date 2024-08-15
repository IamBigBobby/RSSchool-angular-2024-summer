import { initionalSearchWordState, SearchWordState } from './search-word-state';
import { initionalKeyWordState, KeyWordState } from './sort-key-word-state';
import { initialSortVideosState, SortVideosState } from './sort-type-state';
import { initionalVideoState, VideosState } from './video-state';

export interface AppState {
  videos: VideosState;
  searchWord: SearchWordState;
  sortType: SortVideosState;
  sortKeyWord: KeyWordState;
}

export const initialAppState: AppState = {
  videos: initionalVideoState,
  searchWord: initionalSearchWordState,
  sortType: initialSortVideosState,
  sortKeyWord: initionalKeyWordState,
};
