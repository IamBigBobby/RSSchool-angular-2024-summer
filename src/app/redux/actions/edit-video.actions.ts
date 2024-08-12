import { createAction, props } from '@ngrx/store';
import { VideoItem } from '../../core/services/you-tube-interface';

export const addVideo = createAction('[Video] Add Video');
export const removeVideo = createAction('[Video] Remove Video');
export const updateVideos = createAction(
  '[Video] Update Videos',
  props<{ videos: VideoItem[] }>(),
);
