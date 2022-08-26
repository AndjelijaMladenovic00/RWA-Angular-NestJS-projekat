import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LogedUser } from 'src/app/interfaces/logedUser.interface';
import { SignupData } from 'src/app/interfaces/signupData.interface';
import { UserProfileData } from 'src/app/interfaces/userProfileData.interface';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<LogedUser>(`${environment.url}/users/login`, {
      username,
      password,
    });
  }

  loginWithToken(username: string) {
    return this.http.get<LogedUser>(
      `${environment.url}/users/loginWithToken/${username}`
    );
  }

  signup(signupData: SignupData) {
    return this.http.post<User>(`${environment.url}/users/signup`, {
      username: signupData.username,
      password: signupData.password,
      email: signupData.email,
    });
  }

  getProfileData(id: number) {
    return this.http.get<UserProfileData>(
      `${environment.url}/users/getProfileData/${id}`
    );
  }

  getSubscriptions(id: number) {
    return this.http.get<User[]>(
      `${environment.url}/users/getSubscriptionsForUser/${id}`
    );
  }

  getSubscribers(id: number) {
    return this.http.get<User[]>(
      `${environment.url}/users/getSubscribersForUser/${id}`
    );
  }

  subscribe(id: number, subscribingToID: number) {
    return this.http.put<User>(
      `${environment.url}/users/subscribe/${id}/${subscribingToID}`,
      {}
    );
  }

  unsubscribe(id: number, unsubscribingFromID: number) {
    return this.http.put<User>(
      `${environment.url}/users/unsubscribe/${id}/${unsubscribingFromID}`,
      {}
    );
  }

  searchUsers(name: string, userID: number) {
    return this.http.get<User[]>(
      `${environment.url}/users/searchUsers/${name}/${userID}`
    );
  }
}
