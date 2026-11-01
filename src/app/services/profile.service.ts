import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstant } from './app-constants';
import { UserProfile } from '../modules/user-management/profile/profile.component';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    private profileUrl = AppConstant.API_ENDPOINT + 'profile';

    constructor(private http: HttpClient) { }

    getProfile(): Observable<UserProfile> {
        return this.http.get<UserProfile>(this.profileUrl);
    }

    updateProfile(profileData: UserProfile): Observable<UserProfile> {
        return this.http.put<UserProfile>(this.profileUrl, profileData);
    }
}
