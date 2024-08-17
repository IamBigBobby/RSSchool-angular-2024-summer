import { createReducer, on } from '@ngrx/store';
import { initionalVideoState, VideosState } from '../state/video-state';
import { VideoActions } from '../actions/edit-video.actions';

export const videosReducer = createReducer(
  initionalVideoState,
  on(
    VideoActions.loadVideosSuccess,
    (state, { data, nextPageToken, prevPageToken }): VideosState => {
      return {
        ...state,
        videosObj: data,
        nextPageToken,
        prevPageToken,
      };
    },
  ),
);
