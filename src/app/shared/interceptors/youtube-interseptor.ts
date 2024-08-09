import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export function youtubeInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const reqestLink = req.clone({
    url: `https://www.googleapis.com/youtube/v3/${req.url}`,
  });
  return next(reqestLink);
}
