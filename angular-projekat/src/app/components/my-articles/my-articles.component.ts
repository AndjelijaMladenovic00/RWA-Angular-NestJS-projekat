import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Article } from 'src/app/models/article.model';
import { selectMyArticles } from 'src/app/store/article/article.selectors';

@Component({
  selector: 'app-my-articles',
  templateUrl: './my-articles.component.html',
  styleUrls: ['./my-articles.component.css'],
})
export class MyArticlesComponent implements OnInit {
  articles: (Article | undefined)[] = [];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store
      .select(selectMyArticles)
      .subscribe((myArticles: (Article | undefined)[]) => {
        this.articles = myArticles.sort(
          (a: Article | undefined, b: Article | undefined) => {
            if (!a) return 1;
            if (!b) return -1;
            if (a && b)
              if (a.publishedOn > b.publishedOn) return -1;
              else if (a.publishedOn < b.publishedOn) return 1;
              else return 0;
            return 0;
          }
        );
      });
  }
}
