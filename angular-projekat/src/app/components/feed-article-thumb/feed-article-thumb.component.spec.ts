import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedArticleThumbComponent } from './feed-article-thumb.component';

describe('FeedArticleThumbComponent', () => {
  let component: FeedArticleThumbComponent;
  let fixture: ComponentFixture<FeedArticleThumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedArticleThumbComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedArticleThumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
