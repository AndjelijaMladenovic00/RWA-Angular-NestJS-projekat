import { Component, OnInit } from '@angular/core';
import { Report } from 'src/app/models/report.model';
import { ReportService } from 'src/app/services/report-service/report.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {
  reports: Report[] = [];

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.reportService
      .getPendingReports()
      .subscribe((reps: Report[]) => (this.reports = reps));
  }

  removeReport(report: Report) {
    const index: number = this.reports.indexOf(report);
    this.reports = this.reports.splice(index, 1);
  }
}
