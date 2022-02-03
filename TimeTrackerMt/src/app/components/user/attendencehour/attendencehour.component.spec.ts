import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendencehourComponent } from './attendencehour.component';

describe('AttendencehourComponent', () => {
  let component: AttendencehourComponent;
  let fixture: ComponentFixture<AttendencehourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendencehourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendencehourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
