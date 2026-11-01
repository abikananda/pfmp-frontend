import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: 'app',
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./modules/authentication/authentication.module').then(module => module.AuthenticationModule)
      },
      {
        path: 'manual_lending',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/investment/investment.module').then(module => module.InvestmentModule)
      },
      {
        path: 'fixed_investment',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/fixed-investment/fixed-investment.module').then(module => module.FixedInvestmentModule)
      },
      {
        path: 'other_account',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/other-account/other-account.module').then(module => module.OtherAccountModule)
      },
      {
        path: 'profile',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/user-management/user-management.module').then(module => module.UserManagementModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'app/auth',
    pathMatch: 'full'
  }
];
