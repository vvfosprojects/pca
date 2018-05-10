import { TestBed, inject } from '@angular/core/testing';

import { CfCheckService } from './cf-check.service';

describe('CfCheckService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CfCheckService]
    });
  });

  it('should be created', inject([CfCheckService], (service: CfCheckService) => {
    expect(service).toBeTruthy();
  }));
});
