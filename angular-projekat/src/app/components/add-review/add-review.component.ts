import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css'],
})
export class AddReviewComponent implements OnInit {
  comment: string = '';

  constructor() {}

  ngOnInit(): void {}

  setComment(value: string) {
    this.comment = value;
  }
}
