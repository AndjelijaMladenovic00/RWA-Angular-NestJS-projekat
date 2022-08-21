import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReportStatus } from 'src/app/enums/report-status.enum';
import { Report } from 'src/app/models/report.model';
import { ReportService } from 'src/app/services/report-service/report.service';

declare var bootbox: any;

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
        bootbox.confirm(
          'Are you sure that you want to resolve this report? It will delete mationed article and all its reviews!',
          (result: boolean) => {
            if (result && this.report) {
              this.reportService
                .updateReport(this.report.id, ReportStatus.resolved)
                .subscribe((r) => console.log(r));
              this.reportEmiter.emit(this.report);
            }
          }
        );
      } else {
        bootbox.confirm(
          'Are you sure that you want to reject this report?',
          (result: boolean) => {
            if (result && this.report) {
              this.reportService
                .updateReport(this.report.id, ReportStatus.rejected)
                .subscribe((r) => console.log(r));
              this.reportEmiter.emit(this.report);
            }
          }
        );
      }
    }
  }
}
