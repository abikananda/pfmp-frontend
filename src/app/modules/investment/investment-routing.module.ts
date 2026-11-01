import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UploadreportComponent } from './uploadreport/uploadreport.component';
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
      path: 'uploadReport',
      component: UploadreportComponent
    }
  ]
}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvestmentRoutingModule { }
