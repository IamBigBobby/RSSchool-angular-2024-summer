import { createAction, props } from '@ngrx/store';
import { YouTubeInterface } from '../../services/you-tube-interface';

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
    props<{ data: YouTubeInterface }>(),
  ),
  addVideo: createAction(EVideoActions.AddVideo),
  removeVideo: createAction(EVideoActions.RemoveVideo),
};
