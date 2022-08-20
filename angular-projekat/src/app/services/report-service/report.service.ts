import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReportStatus } from 'src/app/enums/report-status.enum';
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

  public getPendingReports() {
    return this.http.get<Report[]>(
      `${environment.url}/reports/getPendingReports`
    );
  }

  public updateReport(id: number, status: ReportStatus) {
    return this.http.put<Report>(
      `${environment.url}/reports/updateReport/${id}/${status}`,
      {}
    );
  }
}
