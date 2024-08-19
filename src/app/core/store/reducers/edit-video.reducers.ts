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
        mixedVideos: [...state.mixedVideos, data.items],
      };
    },
  ),
  on(VideoActions.addVideo, (state, { video }): VideosState => {
    return {
      ...state,
      addedVideos: [video, ...state.addedVideos],
      mixedVideos: [video, ...state.mixedVideos],
    };
  }),
  on(VideoActions.removeVideo, (state, { video }): VideosState => {
    return {
      ...state,
      addedVideos: state.addedVideos.filter((item) => item !== video),
      mixedVideos: state.mixedVideos.filter(
        (videoItem) => Array.isArray(videoItem) || videoItem !== video,
      ),
    };
  }),
  on(VideoActions.loadNextPage, (state): VideosState => {
    return {
      ...state,
      pageNumber: state.pageNumber + 1,
    };
  }),
  on(VideoActions.loadPrevPage, (state): VideosState => {
    return {
      ...state,
      pageNumber: state.pageNumber - 1,
    };
  }),
);
