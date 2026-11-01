import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstant } from './app-constants';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private uploadReport = AppConstant.API_ENDPOINT + 'uploadManualLendingAndInvest';
  private getFilesUrl = AppConstant.API_ENDPOINT + 'files';

  constructor(private http: HttpClient) { }

  upload(file: File, fileType: string): Observable<HttpEvent<object>> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    if (fileType == "ManualLending") {
      this.uploadReport = AppConstant.API_ENDPOINT + 'uploadManualLendingAndInvest';
    } else if (fileType == "DhanStocks") {
      this.uploadReport = AppConstant.API_ENDPOINT + 'uploadStocksAndInvest';
    }
    const req = new HttpRequest('POST', this.uploadReport, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<object> {
    return this.http.get(this.getFilesUrl);
  }
}
