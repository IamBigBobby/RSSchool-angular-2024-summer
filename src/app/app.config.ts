import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { routes } from './app.routes';
import { youtubeInterceptor } from './shared/interceptors/youtube-interseptor';
import { APIInterceptor } from './shared/interceptors/api-interseptor';
import { loadVideos } from './redux/reducers/edit-video.reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(
      withFetch(),
      withInterceptors([APIInterceptor, youtubeInterceptor]),
    ),
    provideStore({ videos: loadVideos }),
  ],
};
