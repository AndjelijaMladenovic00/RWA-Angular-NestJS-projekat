import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private store: Store) {}

  ngOnInit(): void {
    localStorage.removeItem('location');
  }

  ngOnDestroy(): void {}
  title = 'angular-projekat';
}
