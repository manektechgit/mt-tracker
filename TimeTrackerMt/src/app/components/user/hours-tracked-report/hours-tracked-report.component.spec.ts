import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoursTrackedReportComponent } from './hours-tracked-report.component';

describe('HoursTrackedReportComponent', () => {
  let component: HoursTrackedReportComponent;
  let fixture: ComponentFixture<HoursTrackedReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoursTrackedReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoursTrackedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
