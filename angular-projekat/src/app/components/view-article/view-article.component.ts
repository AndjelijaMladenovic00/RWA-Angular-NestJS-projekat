import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faStar, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { createNotification } from 'src/app/interfaces/createNorification.interface';
import { Article } from 'src/app/models/article.model';
import { Review } from 'src/app/models/review.model';
import { NotificationService } from 'src/app/services/notification-service/notification.service';
import { ReportService } from 'src/app/services/report-service/report.service';
import { ReviewService } from 'src/app/services/review-service/review.service';
import {
  updateArticleForDisplayScore,
  updateArticleScore,
} from 'src/app/store/article/article.actions';
import { selectArticleForDisplay } from 'src/app/store/article/article.selectors';
import { selectUserData } from 'src/app/store/user/user.selectors';

@Component({
  selector: 'app-view-article',
  templateUrl: './view-article.component.html',
  styleUrls: ['./view-article.component.css'],
})
export class ViewArticleComponent implements OnInit {
  faStar = faStar;
  faExclamationCircle = faExclamationCircle;

  article: Article | null | undefined = null;
  charNumber: number = 0;
  reviews: Review[] = [];
  alreadyReviewed: boolean = false;
  username: string = '';
  userID: number = -1;
  stopRecursion: boolean = false;
  message: string = '';
  star: HTMLElement | null = null;

  constructor(
    private router: Router,
    private store: Store,
    private reviewService: ReviewService,
    private reportService: ReportService,
    private notificationService: NotificationService
  ) {
    this.star = document.getElementById('star');
  }

  ngOnInit(): void {
    this.store.select(selectUserData).subscribe((data) => {
      if (data && data.id && data.username) {
        this.username = data.username;
        this.userID = data.id;
      }
    });
    this.store.select(selectArticleForDisplay).subscribe((data) => {
      this.article = data;

      if (this.article) {
        this.charNumber = this.article.text.length;

        this.reviewService
          .getReviewsForArticle(this.article.id)
          .subscribe((revs: Review[]) => {
            if (revs && this.article) {
              this.reviews = revs.sort((a: Review, b: Review) => {
                if (a.reviewedOn > b.reviewedOn) return -1;
                else if (a.reviewedOn < b.reviewedOn) return 1;
                else return 0;
              });
              if (!this.reviews || this.reviews.length == 0) {
                this.message = 'No score';
                if (this.star) this.star.style.visibility = 'hidden';
              }

              if (this.reviews && this.reviews.length != 0) {
                const score: number =
                  Math.round(
                    (this.reviews.reduce(
                      (acc: number, review: Review) => (acc += review.score),
                      0
                    ) /
                      this.reviews.length) *
                      100
                  ) / 100;

                this.message = 'Score: ' + score;

                if (this.star) this.star.style.visibility = 'visible';

                this.reviews.forEach((review: Review) => {
                  if (review.username == this.username)
                    this.alreadyReviewed = true;
                });

                if (
                  this.article.averageScore != score &&
                  score != 0 &&
                  !this.stopRecursion
                ) {
                  const id: number = this.article.id;
                  this.store.dispatch(updateArticleScore({ id, score }));
                  this.store.dispatch(updateArticleForDisplayScore({ score }));
                  this.stopRecursion = true;
                }
              }
            }
          });
      }
    });
  }

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

  reportArticle() {
    if (
      this.article &&
      confirm(
        'Are you sure that you want to report this article? You cannot undo this action, and it may lead to deletion of this article.'
      )
    ) {
      this.reportService.createReport(this.article.id, this.userID);
      alert('Report was sent and it will be avaluated!');
    }
  }

  addReview(review: Review) {
    this.reviews.unshift(review);
    if (this.article && this.reviews && this.reviews.length != 0) {
      const score: number =
        Math.round(
          (this.reviews.reduce(
            (acc: number, review: Review) => (acc += review.score),
            0
          ) /
            this.reviews.length) *
            100
        ) / 100;

      const notificationData: createNotification = {
        userID: this.article.userId,
        title: `New review of your article "${this.article.title}"`,
        message: `User ${this.username} reviewed your article "${this.article.title}" and gave it a score of ${review.score}! Go to your article page to see full comment!`,
      };

      console.log(notificationData);

      this.notificationService
        .createNotification(notificationData)
        .subscribe((not) => console.log(not));

      if (this.article.averageScore != score && score != 0) {
        this.stopRecursion = false;
        const id: number = this.article.id;
        this.store.dispatch(updateArticleScore({ id, score }));
        this.store.dispatch(updateArticleForDisplayScore({ score }));
      }
    }
  }
}
