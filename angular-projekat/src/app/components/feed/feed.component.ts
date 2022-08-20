import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { BookGenre } from 'src/app/enums/book-genre.enum';
import { Article } from 'src/app/models/article.model';
import { ArticleService } from 'src/app/services/article-service/article.service';
import { selectID } from 'src/app/store/user/user.selectors';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
  articles: Article[] = [];
  articlesForDisplay: Article[] = [];
  userID: number = -1;
  genre: string = 'all';

  constructor(
    private store: Store,
    private router: Router,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.store.select(selectID).subscribe((id: number | null) => {
      if (id) {
        this.userID = id;
        this.articleService
          .getArticlesForFeed(id)
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
