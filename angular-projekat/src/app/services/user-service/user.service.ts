import { HttpClient, HttpXsrfTokenExtractor } from '@angular/common/http';
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
      username: username,
      password: password,
    });
  }

  signup(signupData: SignupData) {
    return this.http.post<User>(`${environment.url}/users/signup`, {
      username: signupData.username,
      password: signupData.password,
      email: signupData.email,
    });
  }
}
