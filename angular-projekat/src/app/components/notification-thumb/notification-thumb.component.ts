import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Notification } from 'src/app/models/notification.model';
import {
  deleteArticleSuccess,
  selectMyArticle,
} from 'src/app/store/article/article.actions';
import { openNotification } from 'src/app/store/notification/notification.actions';

@Component({
  selector: 'app-notification-thumb',
  templateUrl: './notification-thumb.component.html',
  styleUrls: ['./notification-thumb.component.css'],
})
export class NotificationThumbComponent implements OnInit {
  @Input() notification: Notification | undefined = undefined;
  opened: boolean = false;
  class: string = 'unopened';

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    console.log(this.notification);
    if (this.notification) this.opened = this.notification.opened;
    if (this.opened) this.class = 'opened';

    if (
      this.notification &&
      this.notification.deleteArticleOnReception &&
      this.notification &&
      this.notification.articleID
    ) {
      const id: number = this.notification.articleID;
      this.store.dispatch(deleteArticleSuccess({ id }));
    }
  }

  getDate(d: Date): string {
    const date: Date = new Date(d);
    let s: string = '';
    s +=
      date.getDate() +
      '.' +
      (date.getMonth() + 1) +
      '.' +
      date.getFullYear() +
      '.';
    return s;
  }

  openNotification(title: HTMLElement) {
    if (this.notification && this.opened == false) {
      this.opened = true;
      const id: number = this.notification.id;
      this.store.dispatch(openNotification({ id }));
      title.className = 'opened';
    }
  }

  gotoArticle() {
    if (this.notification && this.notification.articleID) {
      const id: number = this.notification.articleID;
      this.store.dispatch(selectMyArticle({ id }));
      this.router.navigate(['viewMyArticle']);
    }
  }

  gotoProfile() {
    if (this.notification && this.notification.senderID)
      this.router.navigate(['profile', `${this.notification.senderID}`]);
  }
}
