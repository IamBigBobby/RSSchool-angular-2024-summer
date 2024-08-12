import { createSelector } from '@ngrx/store';
import { AppState, VideosState } from '../models/app-state';

const videoStatus = (videos: AppState) => videos.currentVideos;

export const selectVideos = createSelector(
  videoStatus,
  (videosState: VideosState) => videosState.videos,
);
