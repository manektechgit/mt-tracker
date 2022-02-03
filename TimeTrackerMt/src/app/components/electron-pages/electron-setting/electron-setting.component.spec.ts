import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectronSettingComponent } from './electron-setting.component';

describe('ElectronSettingComponent', () => {
  let component: ElectronSettingComponent;
  let fixture: ComponentFixture<ElectronSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectronSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectronSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
