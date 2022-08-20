import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReportStatus } from 'src/app/enums/report-status.enum';
import { Report } from 'src/app/models/report.model';
import { ReportService } from 'src/app/services/report-service/report.service';

@Component({
  selector: 'app-report-thumb',
  templateUrl: './report-thumb.component.html',
  styleUrls: ['./report-thumb.component.css'],
})
export class ReportThumbComponent implements OnInit {
  @Input() report: Report | null = null;
  @Output() reportEmiter: EventEmitter<Report> = new EventEmitter<Report>();
  constructor(private reportService: ReportService) {}

  ngOnInit(): void {}

  getDate(d: Date): string {
    const date: Date = new Date(d);
    let s: string = '';
    s +=
      date.getDate() +
      '.' +
      (date.getMonth() + 1) +
      '.' +
      date.getFullYear() +
      '.';
    return s;
  }

  updateReport(status: string) {
    if (this.report) {
      if (status == 'resolved') {
        this.reportService.updateReport(this.report.id, ReportStatus.resolved);
      } else {
        this.reportService.updateReport(this.report.id, ReportStatus.rejected);
        this.reportEmiter.emit(this.report);
      }
    }
  }
}
