import { Component, OnInit } from '@angular/core';
import {
  faRotateLeft,
  faRotateRight,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';
import { debounceTime, fromEvent, map } from 'rxjs';
@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css'],
})
export class ArticleEditComponent implements OnInit {
  faRotateLeft = faRotateLeft;
  faRotateRight = faRotateRight;
  faUpload = faUpload;

  title: string = '';
  text: string = '';
  genre: string = '';

  undoableActions: string[] = [];
  redoableActions: string[] = [];

  charNumber: number = 0;

  constructor() {}

  ngOnInit(): void {
    const undo: HTMLElement | null = document.getElementById('undo');
    if (undo) undo.style.visibility = 'hidden';

    const redo: HTMLElement | null = document.getElementById('redo');
    if (redo) redo.style.visibility = 'hidden';

    const textInput: HTMLElement | null = <HTMLTextAreaElement>(
      document.getElementById('textInput')
    );
    if (textInput) {
      fromEvent(textInput, 'input')
        .pipe(
          debounceTime(150),
          map((ev: Event) => this.text)
        )
        .subscribe((value: string | null) => {
          console.log(this.undoableActions);
          if (
            value &&
            value != this.undoableActions[this.undoableActions.length - 1]
          ) {
            this.addUndoable(value);
          }
        });
    }
  }

  setTitle(value: string) {
    this.title = value;
  }

  setText(value: string) {
    if (value.length == 1000) {
      alert('You have reached max article length!');
      return;
    }
    this.text = value;
    this.charNumber = value.length;
  }

  setGenre(value: string) {
    this.genre = value;
  }

  addUndoable(value: string | undefined) {
    if (!value) return;
    this.undoableActions.push(value);
    const undo: HTMLElement | null = document.getElementById('undo');
    if (undo) undo.style.visibility = 'visible';

    this.redoableActions = [];
    const redo: HTMLElement | null = document.getElementById('redo');
    if (redo) redo.style.visibility = 'hidden';
  }

  addRedoable(value: string | undefined) {
    if (!value) return;
    this.redoableActions.push(value);
    const redo: HTMLElement | null = document.getElementById('redo');
    if (redo) redo.style.visibility = 'visible';
  }

  undo() {
    const textInput: HTMLElement | null = document.getElementById('textInput');
    this.addRedoable(this.undoableActions.pop());

    if (this.undoableActions.length == 0) {
      const undo: HTMLElement | null = document.getElementById('undo');
      if (undo) undo.style.visibility = 'hidden';

      if (textInput) textInput.innerHTML = '';
    } else {
      if (textInput)
        textInput.textContent =
          this.undoableActions[this.undoableActions.length - 1];
    }
  }

  redo() {
    const textInput: HTMLElement | null = document.getElementById('textInput');
    this.addUndoable(this.redoableActions.pop());
    if (this.redoableActions.length == 0) {
      const redo: HTMLElement | null = document.getElementById('redo');
      if (redo) redo.style.visibility = 'hidden';

      if (textInput) textInput.innerHTML = '';
    } else {
      if (textInput)
        textInput.innerHTML =
          this.undoableActions[this.undoableActions.length - 1];
    }
  }

  publish() {}
}
