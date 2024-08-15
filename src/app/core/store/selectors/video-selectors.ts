import { createSelector } from '@ngrx/store';
import { AppState } from '../state/app-state';
import { VideosState } from '../state/video-state';

const selectVideosState = (state: AppState) => state.videos;

export const selectVideoItems = createSelector(
  selectVideosState,
  (videosState: VideosState) => videosState.videosObj.items,
);
