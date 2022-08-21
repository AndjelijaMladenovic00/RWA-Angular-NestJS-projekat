import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { createReview } from 'src/app/interfaces/createReview.interface';
import { Review } from 'src/app/models/review.model';
import { ReviewService } from 'src/app/services/review-service/review.service';

declare var bootbox: any;

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css'],
})
export class AddReviewComponent implements OnInit {
  comment: string = '';
  @Input() articleID: number | null = null;
  @Input() userID: number | null = null;
  score: number = -1;
  @Output() review = new EventEmitter<Review>();

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {}

  setComment(value: string) {
    this.comment = value;
  }

  setScore(value: number) {
    this.score = value;
  }

  postReview() {
    if (this.score == -1 || this.comment == '') {
      bootbox.alert('Please enter all information for the review!');
      return;
    }

    if (this.userID && this.articleID) {
      const reviewData: createReview = {
        userID: this.userID,
        articleID: this.articleID,
        comment: this.comment,
        score: this.score,
      };

      this.reviewService.postReview(reviewData).subscribe((review: Review) => {
        this.review.emit(review);
        bootbox.alert('Review successfully posted!');
      });
    }
  }
}
