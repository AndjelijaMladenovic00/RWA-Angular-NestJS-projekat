import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Report } from 'src/app/models/report.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private http: HttpClient) {}

  public createReport(articleID: number, userID: number) {
    return this.http.post<Report>(`${environment.url}/reports/createReport`, {
      articleID,
      userID,
    });
  }
}
