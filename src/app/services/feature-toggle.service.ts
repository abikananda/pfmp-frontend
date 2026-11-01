import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeatureToggleService {

  private apiUrl = 'http://localhost:8080/api/features/user';

  constructor(private http: HttpClient) { }

  // Fetch enabled features for a user
  getEnabledFeatures(): Observable<string[]> {
    return this.http.get<{ enabledFeatures: string[] }>(`${this.apiUrl}`).pipe(map(response => response.enabledFeatures));
  }

}
