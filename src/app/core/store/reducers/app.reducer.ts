import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../state/app-state';
import { videosReducer } from './edit-video.reducers';
import { searchReducer } from './search-word.reducers';
import { sortVideosReducer } from './sort-type.reducers';
import { keyWordReducer } from './key-word.reducers';

export const appReducer: ActionReducerMap<AppState> = {
  videos: videosReducer,
  searchWord: searchReducer,
  sortType: sortVideosReducer,
  sortKeyWord: keyWordReducer,
};
