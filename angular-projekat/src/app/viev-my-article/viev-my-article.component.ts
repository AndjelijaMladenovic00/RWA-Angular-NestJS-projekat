import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Article } from '../models/article.model';
import { faFloppyDisk, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { selectMySelectedArticle } from '../store/article/article.selectors';
import { Review } from '../models/review.model';

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

  constructor(
    private router: Router,
    private store: Store /*private reviewService: ReviewService*/
  ) {}

  ngOnInit(): void {
    this.store.select(selectMySelectedArticle).subscribe((data) => {
      this.article = data;

      if (this.article) {
        this.text = this.article.text;
        this.charNumber = this.text.length;
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

  saveChanges() {}

  deleteArticle() {}
}
