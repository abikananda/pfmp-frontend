import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageInvestmentComponent } from './manage-investment/manage-investment.component';
import { AdminComponent } from '../../layout/admin/admin.component';

// baseurl/manual_lending/*
const routes: Routes = [{
  path: '',
  component: AdminComponent,
  children: [
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full'
    },
    {
      path: 'dashboard',
      component: DashboardComponent
    },
    {
      path: 'manage-investment',
      component: ManageInvestmentComponent
    }
  ]
}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FixedInvestmentRoutingModule { }
