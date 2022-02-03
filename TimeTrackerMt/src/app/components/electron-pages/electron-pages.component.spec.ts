import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectronPagesComponent } from './electron-pages.component';

describe('ElectronPagesComponent', () => {
  let component: ElectronPagesComponent;
  let fixture: ComponentFixture<ElectronPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectronPagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectronPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
