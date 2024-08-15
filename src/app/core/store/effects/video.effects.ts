import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  EMPTY,
  map,
  switchMap,
} from 'rxjs';
import { YoutubeService } from '../../services/youtube-service.service';
import { getSearchWord } from '../actions/search.action';
import { VideoActions } from '../actions/edit-video.actions';

@Injectable()
export class VideoEffects {
  private actions$ = inject(Actions);

  private youtubeService$ = inject(YoutubeService);

  private VIDEOS_SEARCH_DEBOUNCE_TIME = 500;

  loadVideos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getSearchWord),
      debounceTime(this.VIDEOS_SEARCH_DEBOUNCE_TIME),
      distinctUntilChanged(),
      switchMap((action) => {
        const query = action.word;
        return this.youtubeService$.getSearchedVideos(query).pipe(
          switchMap((response) => {
            const videoIds = this.youtubeService$.getVideoIds(response);
            return this.youtubeService$.getVideosWithStatistics(videoIds).pipe(
              map((videosWithStatistics) => {
                return VideoActions.loadVideosSuccess({
                  data: videosWithStatistics,
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
