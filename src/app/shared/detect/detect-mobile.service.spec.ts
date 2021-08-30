import { TestBed } from '@angular/core/testing';

import { DetectMobileService } from './detect-mobile.service';

describe('DetectMobileService', () => {
  let service: DetectMobileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetectMobileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
