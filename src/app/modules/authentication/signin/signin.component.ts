import { Component, OnInit } from '@angular/core';
import { AuthLoginInfo } from '../../../models/login-info';
import { AuthService } from '../../../auth/auth.service';
import { TokenStorageService } from '../../../auth/token-storage.service';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-signin',
  
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent implements OnInit {
  form: Record<string, unknown> = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  // roles: string[] = [];
  private loginInfo: AuthLoginInfo | undefined;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router, private logger: NGXLogger) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      // this.roles = this.tokenStorage.getAuthorities();
    }
  }

  onSubmit() {
    this.loginInfo = new AuthLoginInfo(
      this.form['username'] as string,
      this.form['password'] as string);

    this.authService.attemptAuth(this.loginInfo).subscribe({
      next: data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveUserFullName(data.username);
        // this.tokenStorage.saveAuthorities(data.authorities);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        // this.roles = this.tokenStorage.getAuthorities();
        this.router.navigate(['/app/manual_lending']);
      },
      error: e => {
        this.logger.error(e);
        this.errorMessage = e.message;
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage() {
    window.location.reload();
  }
}
