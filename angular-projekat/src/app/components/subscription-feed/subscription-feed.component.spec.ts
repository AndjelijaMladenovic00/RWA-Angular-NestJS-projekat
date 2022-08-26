import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionFeedComponent } from './subscription-feed.component';

describe('SubscriptionFeedComponent', () => {
  let component: SubscriptionFeedComponent;
  let fixture: ComponentFixture<SubscriptionFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionFeedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
