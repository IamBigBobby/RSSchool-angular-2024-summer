import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { authGuard } from './login/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/main/main-content.component').then(
        (m) => m.MainContentComponent,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'detailed-page/:id',
    loadComponent: () =>
      import('./detailed/detailed-page.component').then(
        (m) => m.DetailedPageComponent,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'login-page',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./admin/admin.component').then((m) => m.AdminComponent),
    canActivate: [authGuard],
  },
  {
    path: 'favorite-page',
    loadComponent: () =>
      import('./favorite-page/favorite-page.component').then(
        (m) => m.FavoritePageComponent,
      ),
    canActivate: [authGuard],
  },
  { path: '**', component: PageNotFoundComponent },
];
