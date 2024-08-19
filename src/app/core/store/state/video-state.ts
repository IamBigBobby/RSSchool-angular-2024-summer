import { CustomVideo } from '../../../shared/components/custom-video-card/custom-video-interface';
import { VideoItem, YouTubeResponse } from '../../services/you-tube-interface';

export interface VideosState {
  videosObj: YouTubeResponse;
  nextPageToken: string | undefined;
  prevPageToken: string | undefined;
  addedVideos: CustomVideo[];
  mixedVideos: (CustomVideo | VideoItem[])[];
  favoriteVideos: VideoItem[];
  pageNumber: number;
  itemsPerPage: number;
}

export const initionalVideoState: VideosState = {
  videosObj: {
    kind: '',
    etag: '',
    pageInfo: {
      totalResults: 0,
      resultsPerPage: 0,
    },
    items: [],
  },
  nextPageToken: undefined,
  prevPageToken: undefined,
  addedVideos: [],
  mixedVideos: [],
  favoriteVideos: [],
  pageNumber: 1,
  itemsPerPage: 20,
};
