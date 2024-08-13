import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { routes } from './app.routes';
import { youtubeInterceptor } from './shared/interceptors/youtube-interseptor';
import { APIInterceptor } from './shared/interceptors/api-interseptor';
import { VideoEffects } from './core/store/effects/video.effects';
import { appReducer } from './core/store/reducers/app.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(
      withFetch(),
      withInterceptors([APIInterceptor, youtubeInterceptor]),
    ),
    provideStore(appReducer),
    provideEffects([VideoEffects]),
  ],
};
