import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAppsettingComponent } from './add-edit-appsetting.component';

describe('AddEditAppsettingComponent', () => {
  let component: AddEditAppsettingComponent;
  let fixture: ComponentFixture<AddEditAppsettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditAppsettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditAppsettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
