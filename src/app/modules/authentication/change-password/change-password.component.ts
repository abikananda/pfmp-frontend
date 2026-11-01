import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-change-password',
  
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  form: Record<string, unknown> = {};
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router, private logger: NGXLogger) { }

  onSubmit() {
    this.logger.log(this.form);
    this.authService.changePassword(this.form['current_password'] as string).subscribe({
      next: data => {
        this.logger.log(data);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
        //this.router.navigate(['/app/auth']);
      },
      error: e => {
        this.logger.error(e);
        this.errorMessage = e.error.message;
        this.isSignUpFailed = true;
      }
    });
  }

}
