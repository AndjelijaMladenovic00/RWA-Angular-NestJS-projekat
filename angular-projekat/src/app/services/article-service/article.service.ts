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

  updateArticleScore(id: number, score: number) {
    return this.http.put<Article>(
      `${environment.url}/articles/updateArticleScore`,
      { id: id, score: score }
    );
  }

  getArticlesForFeed(id: number) {
    return this.http.get<Article[]>(
      `${environment.url}/articles/getArticlesForFeed/${id}`
    );
  }

  getArticlesForSubscriptionFeed(id: number) {
    return this.http.get<Article[]>(
      `${environment.url}/articles/getArticlesForSubscriptionFeed/${id}`
    );
  }

  getArticlesForUser(id: number) {
    return this.http.get<Article[]>(
      `${environment.url}/articles/getArticlesForId/${id}`
    );
  }

  searchArticles(name: string, userID: number) {
    return this.http.get<Article[]>(
      `${environment.url}/articles/searchArticles/${name}/${userID}`
    );
  }
}
