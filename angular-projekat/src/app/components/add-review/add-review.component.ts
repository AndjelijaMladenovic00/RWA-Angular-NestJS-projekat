import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css'],
})
export class AddReviewComponent implements OnInit {
  comment: string = '';
  @Input() userId: number | null = null;
  score: number = -1;

  constructor() {}

  ngOnInit(): void {}

  setComment(value: string) {
    this.comment = value;
  }

  setScore(value: number) {
    this.score = value;
    console.log(this.score);
  }

  postReview() {}
}
