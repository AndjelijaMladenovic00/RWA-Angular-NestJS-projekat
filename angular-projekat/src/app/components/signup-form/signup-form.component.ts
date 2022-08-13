import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { profileType } from 'src/app/enums/profile-type.enum';
import { SignupData } from 'src/app/interfaces/signupData.interface';
import { AppState } from 'src/app/store/app.state';
import { signup } from 'src/app/store/user.actions';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css'],
})
export class SignupFormComponent implements OnInit {
  username: string | null = null;
  password: string | null = null;
  confirmedPassword: string | null = null;
  email: string | null = null;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  setUsername(value: string) {
    this.username = value;
  }

  setPassword(value: string) {
    this.password = value;
  }

  setConfirmedPassword(value: string) {
    this.confirmedPassword = value;
  }

  setEmail(value: string) {
    this.email = value;
  }

  signup() {
    if (
      !this.username ||
      !this.password ||
      !this.email ||
      !this.confirmedPassword
    ) {
      alert('Please fill all the required fields!');
      return;
    }

    if (!this.email.split('').includes('@')) {
      alert('Invalid email format!');
      return;
    }

    if (this.password !== this.confirmedPassword) {
      alert('Password and its confirmation should match!');
      return;
    }

    const signupData: SignupData = {
      username: this.username,
      password: this.password,
      email: this.email,
    };

    this.store.dispatch(signup({ signupData }));
  }
}
