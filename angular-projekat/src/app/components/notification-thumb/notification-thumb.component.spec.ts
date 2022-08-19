import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationThumbComponent } from './notification-thumb.component';

describe('NotificationThumbComponent', () => {
  let component: NotificationThumbComponent;
  let fixture: ComponentFixture<NotificationThumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationThumbComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationThumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
