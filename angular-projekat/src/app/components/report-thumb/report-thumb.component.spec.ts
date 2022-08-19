import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportThumbComponent } from './report-thumb.component';

describe('ReportThumbComponent', () => {
  let component: ReportThumbComponent;
  let fixture: ComponentFixture<ReportThumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportThumbComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportThumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
