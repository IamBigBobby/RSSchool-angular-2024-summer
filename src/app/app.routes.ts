import { Routes } from '@angular/router';
import { MainContentComponent } from './home/main/main-content.component';
import { DetailedPageComponent } from './detailed/detailed-page.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { authGuard } from './login/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainContentComponent,
    title: 'Main page',
    canActivate: [authGuard],
  },
  {
    path: 'detailed-page',
    component: DetailedPageComponent,
    title: 'Detailed page',
    canActivate: [authGuard],
  },
  { path: 'login-page', component: LoginComponent, title: 'Login page' },
  { path: '**', component: PageNotFoundComponent, title: 'Page not found' },
];
