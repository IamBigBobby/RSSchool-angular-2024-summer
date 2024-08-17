import { YouTubeResponse } from '../../services/you-tube-interface';

export interface VideosState {
  videosObj: YouTubeResponse;
  nextPageToken: string | undefined;
  prevPageToken: string | undefined;
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
};
