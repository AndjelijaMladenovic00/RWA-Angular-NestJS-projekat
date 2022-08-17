import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css'],
})
export class ScoreComponent implements OnInit {
  faStar = faStar;
  @Output() score = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  setScore(value: number) {
    this.score.emit(value);
  }
}
