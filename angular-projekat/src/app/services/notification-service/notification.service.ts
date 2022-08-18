import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createNotification } from 'src/app/interfaces/createNorification.interface';
import { environment } from 'src/environments/environment';
import { Notification } from 'src/app/models/notification.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private http: HttpClient) {}

  public getNonOpenedNotifications(userID: number) {
    return this.http.get<Notification[]>(
      `${environment.url}/notifications/getNonOpenedNotifications/${userID}`
    );
  }

  public getNotificationsUpdate(userID: number, after: Date) {
    const data = {
      userID,
      after,
    };
    return this.http.get<Notification[]>(
      `${
        environment.url
      }/notifications/getNotificationsUpdate/${userID}/${after.toDateString()}`
    );
  }

  public createNotification(data: createNotification) {
    return this.http.post<Notification>(
      `${environment.url}/notifications/createNotification`,
      data
    );
  }

  public openNotification(id: number) {
    return this.http.put<Notification>(
      `${environment.url}/notifications/openNotification/${id}`,
      {}
    );
  }
}
