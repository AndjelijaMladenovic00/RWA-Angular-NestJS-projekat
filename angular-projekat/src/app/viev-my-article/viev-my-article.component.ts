import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Article } from '../models/article.model';
import { faFloppyDisk, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { selectMySelectedArticle } from '../store/article/article.selectors';
import { Review } from '../models/review.model';
import { ReviewService } from '../services/review-service/review.service';
import { ArticleService } from '../services/article-service/article.service';
import { deleteArticle } from '../store/article/article.actions';

@Component({
  selector: 'app-viev-my-article',
  templateUrl: './viev-my-article.component.html',
  styleUrls: ['./viev-my-article.component.css'],
})
export class VievMyArticleComponent implements OnInit {
  faFloppyDisk = faFloppyDisk;
  faTrashCan = faTrashCan;

  article: Article | null | undefined = null;
  charNumber: number = 0;
  reviews: Review[] = [];
  text: string = '';
  title: string = '';
  genre: string = '';

  constructor(
    private router: Router,
    private store: Store,
    private reviewService: ReviewService,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.store.select(selectMySelectedArticle).subscribe((data) => {
      this.article = data;

      if (this.article) {
        this.text = this.article.text;
        this.title = this.article.title;
        this.genre = this.article.genre.toString();
        this.charNumber = this.text.length;
        this.reviewService.getReviewsForArticle(this.article.id).subscribe(
          (revs: Review[]) =>
            (this.reviews = revs.sort((a: Review, b: Review) => {
              if (a.reviewedOn > b.reviewedOn) return -1;
              else if (a.reviewedOn < b.reviewedOn) return 1;
              else return 0;
              return 0;
            }))
        );
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

  setGenre(value: string) {
    this.genre = value;
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
