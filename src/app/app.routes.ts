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
    canActivate: [authGuard],
  },
  {
    path: 'detailed-page/:id',
    component: DetailedPageComponent,
    canActivate: [authGuard],
  },
  { path: 'login-page', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent },
];
