import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleEditComponent } from './components/article-edit/article-edit.component';
import { FeedComponent } from './components/feed/feed.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { MyArticlesComponent } from './components/my-articles/my-articles.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { NotificationsComponent } from './notifications/notifications.component';
import { ReportsComponent } from './reports/reports.component';

const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: '', component: LoginFormComponent },
  { path: 'signup', component: SignupFormComponent },
  { path: 'feed', component: FeedComponent, canActivate: [AuthGuard] },
  {
    path: 'articleEdit',
    component: ArticleEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'myArticles',
    component: MyArticlesComponent,
    canActivate: [AuthGuard],
  },
  { path: 'reports', component: ReportsComponent, canActivate: [AdminGuard] },
  {
    path: 'notifications',
    component: NotificationsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
