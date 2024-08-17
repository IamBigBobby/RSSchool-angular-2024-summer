import { createAction, props } from '@ngrx/store';
import { YouTubeResponse } from '../../services/you-tube-interface';

export enum EVideoActions {
  LoadVideos = '[Videos] Load Videos',
  LoadVideosSuccess = '[Videos] Load Videos Success',
  LoadNextPage = '[Videos] Load Next Page',
  LoadPrevPage = '[Videos] Load Prev Page',
  AddVideo = '[Videos] Add Video',
  RemoveVideo = '[Videos] Remove Video',
}

export const VideoActions = {
  loadVideos: createAction(EVideoActions.LoadVideos),
  loadVideosSuccess: createAction(
    EVideoActions.LoadVideosSuccess,
    props<{
      data: YouTubeResponse;
      nextPageToken?: string;
      prevPageToken?: string;
    }>(),
  ),
  loadNextPage: createAction(EVideoActions.LoadNextPage),
  loadPrevPage: createAction(EVideoActions.LoadPrevPage),
  addVideo: createAction(EVideoActions.AddVideo),
  removeVideo: createAction(EVideoActions.RemoveVideo),
};
