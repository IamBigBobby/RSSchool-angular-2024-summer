import { createAction, props } from '@ngrx/store';
import { YouTubeResponse } from '../../services/you-tube-interface';

export enum EVideoActions {
  LoadVideos = '[Videos] Load Videos',
  LoadVideosSuccess = '[Videos] Load Videos Success',
  AddVideo = '[Videos] Add Video',
  RemoveVideo = '[Videos] Remove Video',
}

export const VideoActions = {
  loadVideos: createAction(EVideoActions.LoadVideos),
  loadVideosSuccess: createAction(
    EVideoActions.LoadVideosSuccess,
    props<{ data: YouTubeResponse }>(),
  ),
  addVideo: createAction(EVideoActions.AddVideo),
  removeVideo: createAction(EVideoActions.RemoveVideo),
};
