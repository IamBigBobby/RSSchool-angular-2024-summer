import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { YoutubeService } from '../../services/youtube-service.service';
import { VideoActions } from '../actions/edit-video.actions';

@Injectable()
export class VideoEffects {
  private actions$ = inject(Actions);

  private youtubeService = inject(YoutubeService);

  loadVideos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(VideoActions.loadVideos),
      switchMap(() => {
        console.log('Effect triggered: Load Videos');
        return this.youtubeService.loadVideos().pipe(
          map((data) => {
            console.log('Data fetched:', data);
            return VideoActions.loadVideosSuccess({ data });
          }),
        );
      }),
    );
  });
}
