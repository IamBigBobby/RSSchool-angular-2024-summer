import { combineReducers } from '@ngrx/store';
import { AppState } from '../state/app-state';
import { videosReducer } from './edit-video.reducers';

export const appReducer = combineReducers<AppState>({
  videos: videosReducer,
});
