import { Component, Input, OnInit } from '@angular/core';
import { Review } from 'src/app/models/review.model';
import { faCircleUser, faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent implements OnInit {
  faCircleUser = faCircleUser;
  faStar = faStar;

  @Input() review: Review | null = null;

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
