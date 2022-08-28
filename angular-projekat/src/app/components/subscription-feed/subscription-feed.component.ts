import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Article } from 'src/app/models/article.model';
import { ArticleService } from 'src/app/services/article-service/article.service';
import { AppState } from 'src/app/store/app.state';
import { selectID } from 'src/app/store/user/user.selectors';

@Component({
  selector: 'app-subscription-feed',
  templateUrl: './subscription-feed.component.html',
  styleUrls: ['./subscription-feed.component.css'],
})
export class SubscriptionFeedComponent implements OnInit {
  articles: Article[] = [];
  articlesForDisplay: Article[] = [];
  userID: number = -1;
  genre: string = 'all';

  constructor(
    private store: Store<AppState>,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.store.select(selectID).subscribe((id: number | null) => {
      if (id) {
        this.userID = id;
        this.articleService
          .getArticlesForSubscriptionFeed(id)
          .subscribe((articles: Article[]) => {
            this.articles = articles;
            this.articlesForDisplay = articles;
          });
      }
    });
  }

  setGenre(genre: string) {
    this.genre = genre;
    if (this.genre == 'all') {
      this.articlesForDisplay = this.articles;
      return;
    } else {
      this.articlesForDisplay = this.articles.filter(
        (article: Article) => article.genre.toString() == this.genre
      );
    }
  }
}
