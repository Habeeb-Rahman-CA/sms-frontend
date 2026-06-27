import { Routes } from '@angular/router';
import { SignIn } from './features/auth/sign-in/sign-in';
import { Register } from './features/school/register/register';
import { Showcase } from './features/showcase/showcase';
import { AdminDashboard } from './features/dashboard/admin-dashboard/admin-dashboard';

export const routes: Routes = [
  {
    path: 'login',
    component: SignIn,
  },
  {
    path: 'register',
    component: Register,
  },
  {
    path: 'dashboard',
    component: AdminDashboard,
  },
  {
    path: 'showcase',
    component: Showcase,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
