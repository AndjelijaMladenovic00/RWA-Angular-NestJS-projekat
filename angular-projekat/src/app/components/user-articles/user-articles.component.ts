import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Article } from 'src/app/models/article.model';
import { ArticleService } from 'src/app/services/article-service/article.service';

@Component({
  selector: 'app-user-articles',
  templateUrl: './user-articles.component.html',
  styleUrls: ['./user-articles.component.css'],
})
export class UserArticlesComponent implements OnInit {
  articles: Article[] = [];
  articlesForDisplay: Article[] = [];

  id: number = -1;
  username: string = '';
  genre: string = 'all';

  constructor(
    private articleServive: ArticleService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const idParam: string | null = params.get('id');
      const usernameParam: string | null = params.get('username');
      if (idParam && usernameParam) {
        this.id = parseInt(idParam);
        this.username = usernameParam;
        this.articleServive
          .getArticlesForUser(this.id)
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
