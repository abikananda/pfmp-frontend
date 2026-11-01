import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstant } from './app-constants';
import { AccountDashData } from '../modules/other-account/dashboard/dashboard.component';
import { DashData } from '../modules/investment/dashboard/dashboard.component';

@Injectable({
  providedIn: 'root'
})
export class ManualLendingService {
  // [x: string]: any;

  private lendingStatisticsUrl = AppConstant.API_ENDPOINT + 'getManualLendingStatistics';
  private lendingListUrl = AppConstant.API_ENDPOINT + 'getAllManualLendingDetails';

  private addAmtToWalletUrl = AppConstant.API_ENDPOINT + 'addAmtToWallet/';
  private updateActualWalletBalanceUrl = AppConstant.API_ENDPOINT + 'updateActualWalletBalance/';
  private transferAmtToBankUrl = AppConstant.API_ENDPOINT + 'transferAmtToBank/';
  private addInvestmentUrl = AppConstant.API_ENDPOINT + 'doInvestment/';
  private updateInvestmentUrl = AppConstant.API_ENDPOINT + 'sellInvestment/';
  private invListUrl = AppConstant.API_ENDPOINT + 'getAllInvestment/';
  private investmentStatisticsUrl = AppConstant.API_ENDPOINT + 'getInvestmentStatistics/';
  private getGainTxnListUrl = AppConstant.API_ENDPOINT + 'getGainTxnList';
  private getOtherAccountStatisticsUrl = AppConstant.API_ENDPOINT + 'getOtherAccountStatistics';
  private transferAmtToOtherBankUrl = AppConstant.API_ENDPOINT + 'transferAmtToOtherAccount';
  private addUpdateGainTxnUrl = AppConstant.API_ENDPOINT + 'addOrUpdateGainTxns';
  private resetCurrentFYPrincipalAmtUrl = AppConstant.API_ENDPOINT + 'resetCurrentFYPrincipalAmt';

  private monthlyLoanSummaryUrl = AppConstant.API_ENDPOINT + 'loans/monthly-summary';
  private loanSummaryUrl = AppConstant.API_ENDPOINT + 'loans/summary';
  private monthlyInvestmentSummaryUrl = AppConstant.API_ENDPOINT + 'investment/monthly-summary';
  private investmentSummaryUrl = AppConstant.API_ENDPOINT + 'investment/summary';
  private dayWiseLoanSummaryUrl = AppConstant.API_ENDPOINT + 'loans/day-wise-summary';
  private dayWiseInvestmentSummaryUrl = AppConstant.API_ENDPOINT + 'investment/day-wise-summary';

  constructor(private http: HttpClient) { }

  getLendingList(): Observable<string> {
    return this.http.get(this.lendingListUrl, { responseType: 'text' });
  }

  getLendingStatistics(): Observable<DashData> {
    return this.http.get<DashData>(this.lendingStatisticsUrl);
  }

  addAmtToWallet(amount: string, walletType: string): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<string>(this.addAmtToWalletUrl + walletType + "/" + amount, null, httpOptions);
  }
  updateActualWalletBalance(amount: string, walletType: string): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<string>(this.updateActualWalletBalanceUrl + walletType + "/" + amount, null, httpOptions);
  }
  transferAmtToBank(amount: string, walletType: string): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<string>(this.transferAmtToBankUrl + walletType + "/" + amount, null, httpOptions);
  }
  addInvestment(invType: string, info: string): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<string>(this.addInvestmentUrl + invType, info, httpOptions);
  }

  updateInvestment(invType: string, info: string): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<string>(this.updateInvestmentUrl + invType, info, httpOptions);
  }
  updateManualLending(invType: string, info: string): Observable<string> {
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
  getMonthlyLoanSummary(): Observable<any[]> {
    return this.http.get<any[]>(this.monthlyLoanSummaryUrl);
  }
  getLoanSummary(): Observable<any[]> {
    return this.http.get<any[]>(this.loanSummaryUrl);
  }
  getMonthlyInvestmentSummary(): Observable<any[]> {
    return this.http.get<any[]>(this.monthlyInvestmentSummaryUrl);
  }
  getInvestmentSummary(): Observable<any[]> {
    return this.http.get<any[]>(this.investmentSummaryUrl);
  }

  getDayWiseLoanSummary(): Observable<any[]> {
    return this.http.get<any[]>(this.dayWiseLoanSummaryUrl);
  }
  getDayWiseInvestmentSummary(): Observable<any[]> {
    return this.http.get<any[]>(this.dayWiseInvestmentSummaryUrl);
  }

  getGainTxnList(): Observable<string> {
    return this.http.get(this.getGainTxnListUrl, { responseType: 'text' });
  }

  getOtherAccountStatistics(): Observable<AccountDashData> {
    return this.http.get<AccountDashData>(this.getOtherAccountStatisticsUrl);
  }
  transferAmtToOtherBank(amount: number, type: string, comment: string): Observable<string> {
    const params = new HttpParams()
      .set('amount', amount)
      .set('type', type)
      .set('comment', comment);
    return this.http.get<string>(this.transferAmtToOtherBankUrl, { params });
  }
  addUpdateGainTxn(gainAmount: number, particular: string, financialYear: string, status: string): Observable<string> {
    const params = new HttpParams()
      .set('gainAmount', gainAmount)
      .set('particular', particular)
      .set('financialYear', financialYear)
      .set('status', status);
    return this.http.get<string>(this.addUpdateGainTxnUrl, { params });
  }
  resetCurrentFYPrincipalAmt() {
    return this.http.get<string>(this.resetCurrentFYPrincipalAmtUrl);
  }

}
