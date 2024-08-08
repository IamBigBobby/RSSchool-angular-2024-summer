import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { authGuard } from './login/guards/auth.guard';
import { AdminComponent } from './admin/admin.component';

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
  { path: '**', component: PageNotFoundComponent },
];
