import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstant } from './app-constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = AppConstant.API_ENDPOINT + 'test/user';
  private pmUrl = AppConstant.API_ENDPOINT + 'test/pm';
  private adminUrl = AppConstant.API_ENDPOINT + 'test/admin';

  constructor(private http: HttpClient) { }

  getUserBoard(): Observable<string> {
    return this.http.get(this.userUrl, { responseType: 'text' });
  }

  getPMBoard(): Observable<string> {
    return this.http.get(this.pmUrl, { responseType: 'text' });
  }

  getAdminBoard(): Observable<string> {
    return this.http.get(this.adminUrl, { responseType: 'text' });
  }
}
