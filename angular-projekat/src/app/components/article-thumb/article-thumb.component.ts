import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article.model';

@Component({
  selector: 'app-article-thumb',
  templateUrl: './article-thumb.component.html',
  styleUrls: ['./article-thumb.component.css'],
})
export class ArticleThumbComponent implements OnInit {
  @Input() article: Article | null | undefined = null;
  publishedOn: string = '';
  lastEdited: string = '';

  constructor() {}

  ngOnInit(): void {
    if (this.article) {
      const po: Date = this.article.publishedOn;
      this.publishedOn =
        po.getDay + '.' + po.getMonth + '.' + po.getFullYear + '.';
      const le: Date = this.article.lastEdited;
      this.lastEdited =
        le.getDay + '.' + le.getMonth + '.' + le.getFullYear + '.';
      console.log(po, le);
    }
  }
}
