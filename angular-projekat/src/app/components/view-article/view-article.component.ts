import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faStar, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Article } from 'src/app/models/article.model';
import { Review } from 'src/app/models/review.model';
import { ReportService } from 'src/app/services/report-service/report.service';
import { ReviewService } from 'src/app/services/review-service/review.service';
import { updateArticleScore } from 'src/app/store/article/article.actions';
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

  constructor(
    private router: Router,
    private store: Store,
    private reviewService: ReviewService,
    private reportService: ReportService
  ) {}

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
              const score: number =
                Math.round(
                  (this.reviews.reduce(
                    (acc: number, review: Review) => (acc += review.score),
                    0
                  ) /
                    this.reviews.length) *
                    100
                ) / 100;
              if (this.article.averageScore != score) {
                this.article.averageScore = score;
                const id: number = this.article.id;
                this.store.dispatch(updateArticleScore({ id, score }));
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
}
