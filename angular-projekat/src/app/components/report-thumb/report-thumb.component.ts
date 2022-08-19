import { Component, OnInit } from '@angular/core';
import { Report } from 'src/app/models/report.model';

@Component({
  selector: 'app-report-thumb',
  templateUrl: './report-thumb.component.html',
  styleUrls: ['./report-thumb.component.css'],
})
export class ReportThumbComponent implements OnInit {
  report: Report | null = null;
  constructor() {}

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
}
