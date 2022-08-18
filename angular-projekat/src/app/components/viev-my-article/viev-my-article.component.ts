import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Article } from '../../models/article.model';
import {
  faFloppyDisk,
  faStar,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { selectMySelectedArticle } from '../../store/article/article.selectors';
import { Review } from '../../models/review.model';
import { ReviewService } from '../../services/review-service/review.service';
import { ArticleService } from '../../services/article-service/article.service';
import {
  deleteArticle,
  updateMyArticle,
  updateArticleScore,
  updateArticleForDisplayScore,
} from '../../store/article/article.actions';
import { UpdateArticle } from '../../interfaces/updateArticle.interface';
import { BookGenre } from '../../enums/book-genre.enum';

@Component({
  selector: 'app-viev-my-article',
  templateUrl: './viev-my-article.component.html',
  styleUrls: ['./viev-my-article.component.css'],
})
export class VievMyArticleComponent implements OnInit {
  faFloppyDisk = faFloppyDisk;
  faTrashCan = faTrashCan;
  faStar = faStar;

  article: Article | null | undefined = null;
  charNumber: number = 0;
  reviews: Review[] = [];
  text: string = '';
  title: string = '';
  genre: string = '';
  index: number = 0;

  constructor(
    private router: Router,
    private store: Store,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    this.store.select(selectMySelectedArticle).subscribe((data) => {
      this.article = data;

      if (this.article) {
        this.text = this.article.text;
        this.title = this.article.title;
        this.genre = this.article.genre.toString();
        this.charNumber = this.text.length;
        switch (this.article.genre) {
          case 'horror':
            this.index = 0;
            break;
          case 'romance':
            this.index = 1;
            break;
          case 'fantasy':
            this.index = 2;
            break;
          case 'thriller':
            this.index = 3;
            break;
          case 'historical':
            this.index = 3;
            break;
        }
        this.reviewService
          .getReviewsForArticle(this.article.id)
          .subscribe((revs: Review[]) => {
            if (revs && this.article) {
              this.reviews = revs.sort((a: Review, b: Review) => {
                if (a.reviewedOn > b.reviewedOn) return -1;
                else if (a.reviewedOn < b.reviewedOn) return 1;
                else return 0;
              });
              if (this.reviews && this.reviews.length > 0) {
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

  setText(value: string) {
    this.text = value;
  }

  setTitle(value: string) {
    this.title = value;
  }

  setGenre(value: string, index: number) {
    this.genre = value;
    this.index = index;
  }

  saveChanges() {
    if (this.article) {
      if (
        this.text == this.article.text &&
        this.title == this.article.title &&
        this.genre == this.article.genre.toString()
      ) {
        this.router.navigate(['myArticles']);
        return;
      } else {
        if (this.text == '') {
          alert('You cannot submit empty article!');
          return;
        }

        if (this.title == '') {
          alert('You need to insert a title!');
          return;
        }

        if (this.genre == '') {
          alert('You need to select a genre!');
        }

        const data: UpdateArticle = {
          id: this.article.id,
          title: this.title,
          text: this.text,
          genre: <BookGenre>this.genre,
        };

        this.store.dispatch(updateMyArticle({ data }));
      }
    }
  }

  deleteArticle() {
    if (
      this.article &&
      confirm(
        "Are you sure that you want to delete this article? You won't be able to retrieve it back!"
      )
    ) {
      const id: number = this.article.id;
      this.store.dispatch(deleteArticle({ id }));
    }
  }
}
