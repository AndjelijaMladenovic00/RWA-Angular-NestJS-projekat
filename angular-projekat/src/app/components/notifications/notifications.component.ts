import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { Notification } from 'src/app/models/notification.model';
import { AppState } from 'src/app/store/app.state';
import { selectNotifications } from 'src/app/store/notification/notification.selectors';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent implements OnInit {
  notifications: (Notification | undefined)[] = [];
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store
      .select(selectNotifications) //take 1 so that the component doesn't refresh constantly
      .pipe(take(1))
      .subscribe((notifications: (Notification | undefined)[]) => {
        this.notifications = notifications.filter(
          (notification) => notification != undefined
        );
      });
  }
}
