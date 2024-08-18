import { createReducer, on } from '@ngrx/store';
import { initionalVideoState, VideosState } from '../state/video-state';
import { VideoActions } from '../actions/edit-video.actions';

export const videosReducer = createReducer(
  initionalVideoState,
  on(
    VideoActions.loadVideosSuccess,
    (state, { data, nextPageToken, prevPageToken }): VideosState => {
      console.log('add api videos in videosObj', data.items);
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
    console.log('add custom video in addedVideos', video);
    return {
      ...state,
      addedVideos: [video, ...state.addedVideos],
      mixedVideos: [video, ...state.mixedVideos],
    };
  }),
);
