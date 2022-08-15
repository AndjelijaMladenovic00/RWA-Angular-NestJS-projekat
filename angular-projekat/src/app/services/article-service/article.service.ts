import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArticleInfo } from 'src/app/interfaces/articleInfo.interface';
import { UpdateArticle } from 'src/app/interfaces/updateArticle.interface';
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

  loadArticles(id: number) {
    return this.http.get<Article[]>(
      `${environment.url}/articles/getArticlesForId/${id}`
    );
  }

  deleteArticle(id: number) {
    return this.http.delete<Article>(
      `${environment.url}/articles/deleteArticle/${id}`
    );
  }

  updateArticle(data: UpdateArticle) {
    return this.http.put<Article>(
      `${environment.url}/articles/updateArticle`,
      data
    );
  }
}
