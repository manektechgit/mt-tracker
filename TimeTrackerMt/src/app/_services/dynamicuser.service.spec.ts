import { TestBed } from '@angular/core/testing';

import { DynamicuserService } from './dynamicuser.service';

describe('DynamicuserService', () => {
  let service: DynamicuserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicuserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
