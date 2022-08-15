import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VievMyArticleComponent } from './viev-my-article.component';

describe('VievMyArticleComponent', () => {
  let component: VievMyArticleComponent;
  let fixture: ComponentFixture<VievMyArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VievMyArticleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VievMyArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
