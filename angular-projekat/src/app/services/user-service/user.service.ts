import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LogedUser } from 'src/app/interfaces/logedUser.interface';
import { SignupData } from 'src/app/interfaces/signupData.interface';
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
    return this.http.post<LogedUser>(
      `${environment.url}/users/loginWithToken`,
      { username }
    );
  }

  signup(signupData: SignupData) {
    return this.http.post<User>(`${environment.url}/users/signup`, {
      username: signupData.username,
      password: signupData.password,
      email: signupData.email,
    });
  }
}
