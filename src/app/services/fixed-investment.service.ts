import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstant } from './app-constants';
import { AddInvestment } from '../models/AddInvestment';
import { UpdateInvestment } from '../models/UpdateInvestment';
import { DashData } from '../modules/fixed-investment/dashboard/dashboard.component';

@Injectable({
  providedIn: 'root'
})
export class FixedInvestmentService {

  private addInvestmentUrl = AppConstant.API_ENDPOINT + 'doFixedInvestment/';
  private updateInvestmentUrl = AppConstant.API_ENDPOINT + 'sellFixedInvestment/';
  private invListUrl = AppConstant.API_ENDPOINT + 'getAllFixedInvestment/';
  private investmentStatisticsUrl = AppConstant.API_ENDPOINT + 'getFixedInvestmentStatistics/';
  private investmentAllocationsUrl = AppConstant.API_ENDPOINT + 'investmentAllocations';

  constructor(private http: HttpClient) { }

  addInvestment(invType: string, info: AddInvestment): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<string>(this.addInvestmentUrl + invType, info, httpOptions);
  }

  updateInvestment(invType: string, info: UpdateInvestment): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<string>(this.updateInvestmentUrl + invType, info, httpOptions);
  }

  getInvestmentList(invType: string): Observable<string> {
    return this.http.get(this.invListUrl + invType, { responseType: 'text' });
  }

  getInvestmentStatistics(invType: string): Observable<DashData> {
    return this.http.get<DashData>(this.investmentStatisticsUrl + invType);
  }

  getParticulars(invType: string) {
    return this.http.get<Record<string, unknown>[]>(this.invListUrl + invType);
  }
  getInvestmentAllocations() {
    return this.http.get<Record<string, unknown>[]>(this.investmentAllocationsUrl);
  }
}
