import {
  Component,
  ElementRef,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faScroll } from '@fortawesome/free-solid-svg-icons';
import { faBookOpenReader } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faFlag } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';

import { profileType } from 'src/app/enums/profile-type.enum';
import { AppState } from 'src/app/store/app.state';
import { selectUserData } from 'src/app/store/user.selectors';
import { logout } from 'src/app/store/user.actions';

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

  @Output() username: string | null = null;
  @Output() profileType: profileType | null = null;

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select(selectUserData).subscribe((stateData) => {
      if (stateData.username && stateData.profileType) {
        this.username = stateData.username;
        this.profileType = stateData.profileType;
        this.setHeader();
      } else {
        this.clearHeader();
      }
    });
  }

  gotoArticleEdit() {
    console.log('articel');
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
