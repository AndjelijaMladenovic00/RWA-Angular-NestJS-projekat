import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SignupData } from 'src/app/interfaces/signupData.interface';
import { AppState } from 'src/app/store/app.state';
import { signup } from 'src/app/store/user/user.actions';

declare var bootbox: any;

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
      bootbox.alert('Please fill all the required fields!');
      return;
    }

    if (this.username.length < 5) {
      bootbox.alert('Username should have at least 5 characters!');
      return;
    }

    if (!this.email.split('').includes('@')) {
      bootbox.alert('Invalid email format!');
      return;
    }

    if (this.password !== this.confirmedPassword) {
      bootbox.alert('Password and its confirmation should match!');
      return;
    }

    if (this.username.split('').includes(' ')) {
      bootbox.alert('Username should not contain space!');
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
