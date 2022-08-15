import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Article } from 'src/app/models/article.model';
import { selectMyArticle } from 'src/app/store/article/article.actions';

@Component({
  selector: 'app-article-thumb',
  templateUrl: './article-thumb.component.html',
  styleUrls: ['./article-thumb.component.css'],
})
export class ArticleThumbComponent implements OnInit {
  @Input() article: Article | null | undefined = null;

  constructor(private router: Router, private Store: Store) {}

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

  gotoMyArticle() {
    if (this.article) {
      const id: number = this.article.id;
      this.Store.dispatch(selectMyArticle({ id }));
      this.router.navigate(['viewMyArticle']);
    }
  }
}
