import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectronHomeComponent } from './electron-home.component';

describe('ElectronHomeComponent', () => {
  let component: ElectronHomeComponent;
  let fixture: ComponentFixture<ElectronHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectronHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectronHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
