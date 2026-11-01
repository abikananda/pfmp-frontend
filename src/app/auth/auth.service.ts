import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtResponse } from '../models/jwt-response';
import { AuthLoginInfo } from '../models/login-info';
import { SignUpInfo } from '../models/signup-info';
import { TokenStorageService } from './token-storage.service';
import { AppConstant } from '../services/app-constants';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;

  private loginUrl = AppConstant.API_ENDPOINT+'auth/signIn';
  private signupUrl = AppConstant.API_ENDPOINT+'auth/signUp';
  private passwordResetUrl = AppConstant.API_ENDPOINT+'auth/passwordResetUrl';
  private changePasswordUrl = AppConstant.API_ENDPOINT+'auth/changePasswordUrl';

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
  }
  isAuthenticated() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
    return this.isLoggedIn;
  }

  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    const httpOptions = {
      headers: new HttpHeaders({Authorization: 'Basic '+btoa(credentials.username+":"+credentials.password),ContentType: 'application/json'})
    };
    
    return this.http.post<JwtResponse>(this.loginUrl, null, httpOptions);
  }

  signUp(info: SignUpInfo): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<string>(this.signupUrl, info, httpOptions);
  }

  resetPassword(email: string): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<string>(this.passwordResetUrl, email, httpOptions);
  }
  changePassword(email: string): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<string>(this.changePasswordUrl, email, httpOptions);
  }
}
