import { NgModule } from '@angular/core';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [ProfileComponent],
  imports: [
    UserManagementRoutingModule,
    SharedModule
  ]
})
export class UserManagementModule { }
