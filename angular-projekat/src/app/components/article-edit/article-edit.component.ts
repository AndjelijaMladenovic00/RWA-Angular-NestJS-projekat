import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  faRotateLeft,
  faRotateRight,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';
import { debounceTime, fromEvent, map } from 'rxjs';
import { ArticleInfo } from 'src/app/interfaces/articleInfo.interface';
import { Store } from '@ngrx/store';
import { postArticle } from 'src/app/store/article/article.actions';
import { selectID } from 'src/app/store/user/user.selectors';
import { AppState } from 'src/app/store/app.state';

declare var bootbox: any;

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
  published: boolean = false;

  userId: number = -1;

  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {
    this.store.select(selectID).subscribe((id: number | null) => {
      if (id) this.userId = id;
    });
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
    if ((!this.published && this.title != '') || this.text != '') {
      localStorage.setItem('title', this.title);
      localStorage.setItem('text', this.text);
    } else {
      localStorage.removeItem('title');
      localStorage.removeItem('text');
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

    const redo: HTMLElement | null = document.getElementById('redo');
    if (redo && this.redoableActions.length == 0)
      redo.style.visibility = 'hidden';

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
    localStorage.removeItem('text');
    localStorage.removeItem('title');

    if (this.title == '') {
      bootbox.alert('You need to insert a title!');
      return;
    }

    if (this.genre == '') {
      bootbox.alert('You need to insert a genre!');
      return;
    }

    if (this.text == '') {
      bootbox.alert('You cannot publish an empty article!');
      return;
    }

    bootbox.confirm(
      `Are you sure that you want to publish an article named "${this.title}"?`,
      (result: boolean) => {
        if (result) {
          const article: ArticleInfo = {
            title: this.title,
            text: this.text,
            userId: this.userId,
            genre: this.genre,
          };

          this.text = '';
          this.title = '';

          this.store.dispatch(postArticle({ article }));
          this.published = true;
        }
      }
    );
  }
}
