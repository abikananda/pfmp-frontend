import { Component } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { SignUpInfo } from '../../../models/signup-info';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-signup',
  
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  form: Record<string, unknown> = {};
  signupInfo: SignUpInfo | undefined;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router, private logger: NGXLogger) { }

  onSubmit() {
    this.signupInfo = new SignUpInfo(
      this.form['name'] as string,
      this.form['username'] as string,
      this.form['email'] as string,
      this.form['password'] as string);

    this.authService.signUp(this.signupInfo).subscribe({
      next: data => {
        this.logger.log(data);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
        this.router.navigate(['/app/auth']);
      },
      error: e => {
        this.logger.error(e);
        this.errorMessage = e.error?e.error.message:'Something went wrong, status='+e.status;
        this.isSignUpFailed = true;
      }
    });
  }
}
