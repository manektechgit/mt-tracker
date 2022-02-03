import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAppsettingsComponent } from './add-edit-appsettings.component';

describe('AddEditAppsettingsComponent', () => {
  let component: AddEditAppsettingsComponent;
  let fixture: ComponentFixture<AddEditAppsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditAppsettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditAppsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
