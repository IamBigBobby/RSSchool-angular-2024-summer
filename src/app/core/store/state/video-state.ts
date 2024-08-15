import { YouTubeResponse } from '../../services/you-tube-interface';

export interface VideosState {
  videosObj: YouTubeResponse;
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
};
