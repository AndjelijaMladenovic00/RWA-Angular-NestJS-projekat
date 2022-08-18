import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faScroll } from '@fortawesome/free-solid-svg-icons';
import { faBookOpenReader } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faFlag } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { profileType } from 'src/app/enums/profile-type.enum';
import { AppState } from 'src/app/store/app.state';
import { logout } from 'src/app/store/user/user.actions';
import { selectUserData } from 'src/app/store/user/user.selectors';
import { Notification } from 'src/app/models/notification.model';
import {
  clearArticleForDisplayState,
  clearMyArticlesState,
  loadMyArticles,
} from 'src/app/store/article/article.actions';
import * as NotificationsActions from '../../store/notification/notification.actions';
import { interval } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  faPencil = faPencil;
  faScroll = faScroll;
  faBookOpenReader = faBookOpenReader;
  faComment = faComment;
  faFlag = faFlag;

  username: string | null = null;
  profileType: profileType | null = null;

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {
    localStorage.removeItem('JWT');

    this.store.select(selectUserData).subscribe((stateData) => {
      if (stateData.username && stateData.profileType && stateData.id) {
        this.username = stateData.username;
        this.profileType = stateData.profileType;
        const id: number = stateData.id;
        this.store.dispatch(loadMyArticles({ id }));

        this.store.dispatch(
          NotificationsActions.initNotificationsState({
            id,
          })
        );

        const after: Date = new Date(new Date().valueOf() - 180000);

        interval(180000).subscribe(() => {
          this.store.dispatch(
            NotificationsActions.updateNotifications({ id, after })
          );
        });

        this.setHeader();
      } else {
        this.clearHeader();
      }
    });
  }

  gotoArticleEdit() {
    this.router.navigate(['articleEdit']);
  }

  gotoFeed() {
    this.router.navigate(['feed']);
  }

  gotoMyArticles() {
    this.router.navigate(['myArticles']);
  }

  gotoReports() {
    this.router.navigate(['reports']);
  }

  gotoNotifications() {
    this.router.navigate(['notifications']);
  }

  logout() {
    localStorage.removeItem('JWT');
    this.router.navigate(['login']);
    this.store.dispatch(logout());
    this.store.dispatch(clearMyArticlesState());
    this.store.dispatch(clearArticleForDisplayState());
    localStorage.removeItem('text');
    localStorage.removeItem('title');
  }

  setHeader() {
    const userLabel: HTMLElement | null = document.getElementById('userLabel');
    if (userLabel) userLabel.textContent = this.username;

    const userInfo: HTMLElement | null = document.getElementById('userInfo');
    if (userInfo) userInfo.style.visibility = 'visible';

    const title: HTMLElement | null = document.getElementById('title');
    if (title) title.className = 'headerTitle';

    const menu: HTMLElement | null = document.getElementById('menu');
    if (menu) menu.style.visibility = 'visible';

    const button: HTMLElement | null = document.getElementById('reports');
    if (button && this.profileType === 'user') {
      button.style.visibility = 'hidden';
      button.style.pointerEvents = 'none';
    }
  }

  clearHeader() {
    const userInfo: HTMLElement | null = document.getElementById('userInfo');
    if (userInfo) userInfo.style.visibility = 'hidden';

    const title: HTMLElement | null = document.getElementById('title');
    if (title) title.className = 'titleNotLogedIn';

    const menu: HTMLElement | null = document.getElementById('menu');
    if (menu) menu.style.visibility = 'hidden';
  }
}
