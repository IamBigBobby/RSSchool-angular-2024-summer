import { createSelector } from '@ngrx/store';
import { AppState } from '../state/app-state';
import { VideosState } from '../state/video-state';
import { SortVideosState } from '../state/sort-type-state';
import { VideoItem } from '../../services/you-tube-interface';
import { KeyWordState } from '../state/sort-key-word-state';
import { CustomVideo } from '../../../shared/components/custom-video-card/custom-video-interface';

const selectVideosState = (state: AppState) => state.videos;
const selectVideosSortType = (state: AppState) => state.sortType;
const selectVideosKeyType = (state: AppState) => state.sortKeyWord;

export const selectVideoItems = createSelector(
  selectVideosState,
  (videosState: VideosState) => videosState.videosObj.items,
);

export const selectNextPageToken = createSelector(
  selectVideosState,
  (videosState: VideosState) => videosState.nextPageToken,
);

export const selectPrevPageToken = createSelector(
  selectVideosState,
  (videosState: VideosState) => videosState.prevPageToken,
);

export const selectSortType = createSelector(
  selectVideosSortType,
  (videoSortType: SortVideosState) => videoSortType.sortType,
);

export const selectKeyType = createSelector(
  selectVideosKeyType,
  (videoKeyType: KeyWordState) => videoKeyType.sortKeyWord,
);

export const selectCustomVideos = createSelector(
  selectVideosState,
  (videosState: VideosState) => videosState.addedVideos,
);

export const selectMixedVideos = createSelector(
  selectVideosState,
  (videosstate: VideosState) => videosstate.mixedVideos.flat(2),
);

export const selectPageNumber = createSelector(
  selectVideosState,
  (videosState: VideosState) => videosState.pageNumber,
);

export const selectItemsPerPage = createSelector(
  selectVideosState,
  (videosState: VideosState) => videosState.itemsPerPage,
);

export const selectCurrentMixedVideos = createSelector(
  selectMixedVideos,
  selectPageNumber,
  selectItemsPerPage,
  (mixedVideos: (CustomVideo | VideoItem)[], pageNumber, itemsPerPage) => {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return mixedVideos.slice(startIndex, endIndex);
  },
);

export const selectCurrentMixedVideosVideoItem = createSelector(
  selectCurrentMixedVideos,
  (mixedVideos: (CustomVideo | VideoItem)[]) => {
    return mixedVideos.filter(
      (video): video is VideoItem => 'snippet' in video,
    );
  },
);

export const selectFavoriteVideos = createSelector(
  selectVideosState,
  (favoriteVideos: VideosState) => favoriteVideos.favoriteVideos,
);

export const selectSortedVideoItems = createSelector(
  selectCurrentMixedVideos,
  selectSortType,
  selectKeyType,
  (
    videoItems: (VideoItem | CustomVideo)[],
    sortType: string,
    keyword: string,
  ) => {
    let sortedItemsVideoItem = videoItems.filter(
      (video): video is VideoItem => 'snippet' in video,
    );
    const sortedItemsCustomItem = videoItems.filter(
      (video): video is CustomVideo => 'title' in video,
    );

    switch (sortType) {
      case 'dateAsc':
        sortedItemsVideoItem = sortedItemsVideoItem.sort(
          (a, b) =>
            new Date(a.snippet?.publishedAt ?? '').getTime() -
            new Date(b.snippet?.publishedAt ?? '').getTime(),
        );
        break;
      case 'dateDesc':
        sortedItemsVideoItem = sortedItemsVideoItem.sort(
          (a, b) =>
            new Date(b.snippet?.publishedAt ?? '').getTime() -
            new Date(a.snippet?.publishedAt ?? '').getTime(),
        );
        break;
      case 'viewsAsc':
        sortedItemsVideoItem = sortedItemsVideoItem.sort(
          (a, b) =>
            Number(a.statistics?.viewCount ?? 0) -
            Number(b.statistics?.viewCount ?? 0),
        );
        break;
      case 'viewsDesc':
        sortedItemsVideoItem = sortedItemsVideoItem.sort(
          (a, b) =>
            Number(b.statistics?.viewCount ?? 0) -
            Number(a.statistics?.viewCount ?? 0),
        );
        break;
      default:
        break;
    }

    if (keyword) {
      sortedItemsVideoItem = sortedItemsVideoItem.filter((video) =>
        video.snippet?.title.toLowerCase().includes(keyword.toLowerCase()),
      );
    }

    return [...sortedItemsCustomItem, ...sortedItemsVideoItem];
  },
);
