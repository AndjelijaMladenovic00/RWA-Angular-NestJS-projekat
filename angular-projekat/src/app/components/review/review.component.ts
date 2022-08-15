import { Component, Input, OnInit } from '@angular/core';
import { Review } from 'src/app/models/review.model';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent implements OnInit {
  @Input() review: Review | null = null;

  constructor() {}

  ngOnInit(): void {}
}
