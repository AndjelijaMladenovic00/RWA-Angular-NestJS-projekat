import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, catchError, of, tap } from 'rxjs';
import { Article } from 'src/app/models/article.model';
import { ArticleService } from 'src/app/services/article-service/article.service';
import * as ArticleActions from './article.actions';

@Injectable()
export class ArticleEffects {
  constructor(
    private action$: Actions,
    private articleService: ArticleService,
    private router: Router
  ) {}

  createArticleRequest$ = createEffect(() =>
    this.action$.pipe(
      ofType(ArticleActions.postArticle),
      exhaustMap((action) =>
        this.articleService.createArticle(action.article).pipe(
          map((article: Article) =>
            ArticleActions.postArticleSuccess({ article })
          ),
          catchError(() => of(ArticleActions.postArticleFail()))
        )
      )
    )
  );

  loadMyArticle$ = createEffect(() =>
    this.action$.pipe(
      ofType(ArticleActions.loadMyArticles),
      exhaustMap((action) =>
        this.articleService
          .loadArticles(action.id)
          .pipe(
            map((articles: Article[]) =>
              ArticleActions.loadMyArticlesSuccess({ articles })
            )
          )
      ),
      catchError(() => of(ArticleActions.loadMyArticlesFail()))
    )
  );

  deleteArticle$ = createEffect(() =>
    this.action$.pipe(
      ofType(ArticleActions.deleteArticle),
      exhaustMap((action) => {
        const id: number = action.id;
        return this.articleService
          .deleteArticle(action.id)
          .pipe(
            map((res: Article) => ArticleActions.deleteArticleSuccess({ id }))
          );
      }),
      catchError(() => of(ArticleActions.deleteArticleFail()))
    )
  );

  deleteArticlesSucce$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(ArticleActions.deleteArticleSuccess),
        tap(() => {
          this.router.navigate(['myArticles']);
        })
      ),
    { dispatch: false }
  );

  updateMyArticle$ = createEffect(() =>
    this.action$.pipe(
      ofType(ArticleActions.updateMyArticle),
      exhaustMap((action) =>
        this.articleService
          .updateArticle(action.data)
          .pipe(
            map((article: Article) =>
              ArticleActions.updateMyArticleSuccess({ article })
            )
          )
      ),
      catchError(() => of(ArticleActions.updateMyArticleFail()))
    )
  );

  updateMyArticlesSucces = createEffect(
    () =>
      this.action$.pipe(
        ofType(ArticleActions.updateMyArticleSuccess),
        tap(() => {
          this.router.navigate(['myArticles']);
        })
      ),
    { dispatch: false }
  );
}
