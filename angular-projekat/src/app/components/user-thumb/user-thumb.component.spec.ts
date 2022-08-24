import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserThumbComponent } from './user-thumb.component';

describe('UserThumbComponent', () => {
  let component: UserThumbComponent;
  let fixture: ComponentFixture<UserThumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserThumbComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserThumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
