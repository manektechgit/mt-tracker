import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAttendencehourComponent } from './add-edit-attendencehour.component';

describe('AddEditAttendencehourComponent', () => {
  let component: AddEditAttendencehourComponent;
  let fixture: ComponentFixture<AddEditAttendencehourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditAttendencehourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditAttendencehourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
