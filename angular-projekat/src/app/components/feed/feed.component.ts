import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Article } from 'src/app/models/article.model';
import { ArticleService } from 'src/app/services/article-service/article.service';
import { selectID } from 'src/app/store/user/user.selectors';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
  articles: Observable<Article[]> | null = null;
  userID: number = -1;

  constructor(
    private store: Store,
    private router: Router,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.store.select(selectID).subscribe((id: number | null) => {
      if (id) {
        this.userID = id;
        this.articles = this.articleService.getArticlesForFeed(id);
      }
    });
  }
}
