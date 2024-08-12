import { createReducer, on } from '@ngrx/store';
import { updateVideos } from '../actions/edit-video.actions';
import { VideoItem } from '../../core/services/you-tube-interface';

export interface VideoState {
  videos: VideoItem[];
}

const initialState: VideoState = {
  videos: [],
};

export const loadVideos = createReducer(
  initialState,
  on(updateVideos, (state, { videos }) => {
    console.log('Updating videos:', videos);
    console.log('state', state);
    return {
      videos,
    };
  }),
);
