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
    this.reportService.getPendingReports().subscribe((reps: Report[]) => {
      this.reports = reps;
      const label: HTMLElement | null =
        document.getElementById('noReportsLabel');
      if (this.reports.length == 0 && label) label.style.visibility = 'visible';
    });
  }

  removeReport(report: Report) {
    let i: number = 0;
    while (i < this.reports.length) {
      if (this.reports[i].articleID == report.articleID) {
        this.reports.splice(i, 1);
      } else i++;
    }
    const label = document.getElementById('noReportsLabel');
    if (this.reports.length == 0) {
      if (label) label.style.visibility = 'visible';
    } else if (label) label.style.visibility = 'hidden';
  }
}
