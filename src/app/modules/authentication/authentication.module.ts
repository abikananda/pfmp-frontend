import { NgModule } from '@angular/core';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
    ChangePasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    AuthenticationRoutingModule,
    SharedModule
  ],
  providers: [],
})
export class AuthenticationModule { }
