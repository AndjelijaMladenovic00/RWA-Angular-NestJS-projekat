import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleThumbComponent } from './article-thumb.component';

describe('ArticleThumbComponent', () => {
  let component: ArticleThumbComponent;
  let fixture: ComponentFixture<ArticleThumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleThumbComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleThumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
