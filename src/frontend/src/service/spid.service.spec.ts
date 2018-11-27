import { TestBed } from '@angular/core/testing';

import { SpidService } from './spid.service';

describe('SpidService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpidService = TestBed.get(SpidService);
    expect(service).toBeTruthy();
  });
});
