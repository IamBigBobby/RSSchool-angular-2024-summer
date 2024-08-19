import { createAction, props } from '@ngrx/store';
import { VideoItem, YouTubeResponse } from '../../services/you-tube-interface';
import { CustomVideo } from '../../../shared/components/custom-video-card/custom-video-interface';

export enum EVideoActions {
  LoadVideos = '[Videos] Load Videos',
  LoadVideosSuccess = '[Videos] Load Videos Success',
  LoadNextPage = '[Videos] Load Next Page',
  LoadPrevPage = '[Videos] Load Prev Page',
  AddVideo = '[Videos] Add Video',
  RemoveVideo = '[Videos] Remove Video',
  AddToFavorite = '[Videos] Add To Favorite',
  RemoveFromFavorite = '[Videos] Remove From Favorite',
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
  addVideo: createAction(
    EVideoActions.AddVideo,
    props<{ video: CustomVideo }>(),
  ),
  removeVideo: createAction(
    EVideoActions.RemoveVideo,
    props<{ video: CustomVideo }>(),
  ),
  addToFavorite: createAction(
    EVideoActions.AddToFavorite,
    props<{ video: VideoItem }>(),
  ),
  removeFromFavorite: createAction(
    EVideoActions.RemoveFromFavorite,
    props<{ video: VideoItem }>(),
  ),
};
