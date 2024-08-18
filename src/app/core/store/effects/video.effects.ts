import { concatLatestFrom } from '@ngrx/operators';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, debounceTime, EMPTY, map, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { YoutubeService } from '../../services/youtube-service.service';
import { getSearchWord } from '../actions/search.action';
import { VideoActions } from '../actions/edit-video.actions';
import { appSelector } from '../selectors/app-selectors';

@Injectable()
export class VideoEffects {
  private actions$ = inject(Actions);

  private youtubeService$ = inject(YoutubeService);

  private store = inject(Store);

  private VIDEOS_SEARCH_DEBOUNCE_TIME = 500;

  loadVideos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getSearchWord),
      debounceTime(this.VIDEOS_SEARCH_DEBOUNCE_TIME),
      switchMap((action) => {
        const query = action.word;
        return this.youtubeService$.getSearchedVideos(query).pipe(
          switchMap((response) => {
            const videoIds = this.youtubeService$.getVideoIds(response);
            return this.youtubeService$.getVideosWithStatistics(videoIds).pipe(
              map((videosWithStatistics) => {
                return VideoActions.loadVideosSuccess({
                  data: videosWithStatistics,
                  nextPageToken: response.nextPageToken,
                  prevPageToken: response.prevPageToken,
                });
              }),
              catchError((error) => {
                console.error('Error loading videos:', error);
                return EMPTY;
              }),
            );
          }),
        );
      }),
    );
  });

  loadPage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(VideoActions.loadNextPage, VideoActions.loadPrevPage),
      concatLatestFrom(() => this.store.select(appSelector)),
      switchMap(([action, state]) => {
        const pageToken =
          action.type === VideoActions.loadNextPage.type
            ? state.videos.nextPageToken
            : state.videos.prevPageToken;

        const query = state.searchWord.searchWord;

        return this.youtubeService$.getSearchedVideos(query, pageToken).pipe(
          switchMap((response) => {
            const videoIds = this.youtubeService$.getVideoIds(response);
            return this.youtubeService$.getVideosWithStatistics(videoIds).pipe(
              map((videosWithStatistics) => {
                return VideoActions.loadVideosSuccess({
                  data: videosWithStatistics,
                  nextPageToken: response.nextPageToken,
                  prevPageToken: response.prevPageToken,
                });
              }),
              catchError((error) => {
                console.error('Error loading videos:', error);
                return EMPTY;
              }),
            );
          }),
        );
      }),
    );
  });
}
