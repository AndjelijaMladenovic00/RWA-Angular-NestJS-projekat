import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faRotateLeft,
  faRotateRight,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';
import { debounceTime, fromEvent, map } from 'rxjs';
import { ArticleInfo } from 'src/app/interfaces/articleInfo.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';
import { postArticle } from 'src/app/store/article/article.actions';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css'],
})
export class ArticleEditComponent implements OnInit, OnDestroy {
  faRotateLeft = faRotateLeft;
  faRotateRight = faRotateRight;
  faUpload = faUpload;

  title: string = '';
  text: string = '';
  genre: string = '';

  undoableActions: string[] = [];
  redoableActions: string[] = [];

  charNumber: number = 0;

  constructor(private router: Router, private store: Store) {}
  ngOnInit(): void {
    const title: string | null = localStorage.getItem('title');
    const text: string | null = localStorage.getItem('text');

    if (title || text) {
      if (text) {
        const textInput: HTMLTextAreaElement | null = <HTMLTextAreaElement>(
          document.getElementById('textInput')
        );
        if (textInput) textInput.value = text;
        this.text = text;
      }

      if (title) {
        const titleInput: HTMLInputElement | null = <HTMLInputElement>(
          document.getElementById('titleInput')
        );
        if (titleInput) titleInput.value = title;
        this.title = title;
      }

      localStorage.removeItem('text');
      localStorage.removeItem('title');
    }
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
          if (
            value &&
            value != this.undoableActions[this.undoableActions.length - 1]
          ) {
            this.addUndoable(value, false);
          }
        });
    }
  }

  ngOnDestroy(): void {
    if (this.title != '' || this.text != '') {
      localStorage.setItem('title', this.title);
      localStorage.setItem('text', this.text);
    }
  }

  setTitle(value: string) {
    this.title = value;
  }

  setText(value: string) {
    this.charNumber = value.length;
    if (value.length == 10000) {
      alert('You have reached max article length!');
      return;
    }
    this.text = value;
  }

  setGenre(value: string) {
    this.genre = value;
  }

  addUndoable(value: string | undefined, fromRedo: boolean) {
    if (!value) return;
    this.undoableActions.push(value);
    const undo: HTMLElement | null = document.getElementById('undo');
    if (undo) undo.style.visibility = 'visible';

    if (fromRedo == false) {
      this.redoableActions = [];
      const redo: HTMLElement | null = document.getElementById('redo');
      if (redo) redo.style.visibility = 'hidden';
    }
  }

  addRedoable(value: string | undefined) {
    if (!value) return;
    this.redoableActions.push(value);
    const redo: HTMLElement | null = document.getElementById('redo');
    if (redo) redo.style.visibility = 'visible';
  }

  undo() {
    const textInput: HTMLTextAreaElement | null = <HTMLTextAreaElement>(
      document.getElementById('textInput')
    );
    this.addRedoable(this.undoableActions.pop());

    if (this.undoableActions.length == 0) {
      const undo: HTMLElement | null = document.getElementById('undo');
      if (undo) undo.style.visibility = 'hidden';

      if (textInput) textInput.value = '';
    } else {
      if (textInput)
        textInput.value = this.undoableActions[this.undoableActions.length - 1];
    }
  }

  redo() {
    const textInput: HTMLTextAreaElement | null = <HTMLTextAreaElement>(
      document.getElementById('textInput')
    );
    this.addUndoable(this.redoableActions.pop(), true);
    if (textInput)
      textInput.value = this.undoableActions[this.undoableActions.length - 1];
  }

  publish() {
    if (this.title == '') {
      alert('You need to insert a title!');
      return;
    }

    if (this.genre == '') {
      alert('You need to insert a genre!');
      return;
    }

    if (this.text == '') {
      alert('You cannot publish an empty article!');
      return;
    }

    if (
      confirm(
        `Are you sure that you want to publish an article named "${this.title}"?`
      )
    ) {
      const jwtHelper: JwtHelperService = new JwtHelperService();
      const token: string | null = localStorage.getItem('JWT');
      if (!token) return;
      const userId = jwtHelper.decodeToken(token).id;

      console.log(userId);

      const article: ArticleInfo = {
        title: this.title,
        text: this.text,
        userId: userId,
        genre: this.genre,
      };

      this.store.dispatch(postArticle({ article }));

      /*const textInput: HTMLTextAreaElement | null = <HTMLTextAreaElement>(
        document.getElementById('textInput')
      );
      if (textInput) textInput.value = '';

      const titleInput: HTMLInputElement | null = <HTMLInputElement>(
        document.getElementById('titleInput')
      );
      if (titleInput) titleInput.value = '';*/
    }
  }
}
