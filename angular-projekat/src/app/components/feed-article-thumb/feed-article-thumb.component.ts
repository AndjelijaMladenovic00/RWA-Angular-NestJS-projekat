import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Article } from 'src/app/models/article.model';
import { setArticleForDisplay } from 'src/app/store/article/article.actions';

@Component({
  selector: 'app-feed-article-thumb',
  templateUrl: './feed-article-thumb.component.html',
  styleUrls: ['./feed-article-thumb.component.css'],
})
export class FeedArticleThumbComponent implements OnInit {
  @Input() article: Article | null = null;
  faStar = faStar;

  constructor(private store: Store, private router: Router) {}

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

  gotoArticle() {
    if (this.article) {
      const id: number = this.article.id;
      const article: Article = this.article;
      this.store.dispatch(setArticleForDisplay({ article }));
      this.router.navigate(['viewArticle']);
    }
  }
}
