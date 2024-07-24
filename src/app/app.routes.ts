import { Routes } from '@angular/router';
import { MainContentComponent } from './home/main/main-content.component';
import { DetailedPageComponent } from './detailed/detailed-page.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: 'main-page', component: MainContentComponent, title: 'Main page' },
  {
    path: 'detailed-page',
    component: DetailedPageComponent,
    title: 'Detailed page',
  },
  { path: 'login-page', component: LoginComponent, title: 'Login page' },
];
