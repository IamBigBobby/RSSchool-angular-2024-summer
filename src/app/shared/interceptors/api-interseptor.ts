import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export function APIInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const key = 'AIzaSyAsslk2ZsR14rpQXl-gaqRyDkrs4Syi9w0';
  // const key = 'AIzaSyBvVDXveD0RQq0R3rKIuwM_OUx7yXDqglw';
  const reqWithAPI = req.clone({
    params: req.params.set('key', key),
  });
  return next(reqWithAPI);
}
