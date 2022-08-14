import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArticleInfo } from 'src/app/interfaces/articleInfo.interface';
import { Article } from 'src/app/models/article.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private http: HttpClient) {}

  createArticle(data: ArticleInfo) {
    return this.http.post<Article>(
      `${environment.url}/articles/createArticle`,
      {
        title: data.title,
        text: data.text,
        userId: data.userId,
        genre: data.genre,
      }
    );
  }
}
