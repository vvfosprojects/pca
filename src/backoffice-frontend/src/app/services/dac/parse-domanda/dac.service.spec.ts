import { TestBed } from '@angular/core/testing';

import { DacService } from './dac.service';

describe('DacService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DacService = TestBed.get(DacService);
    expect(service).toBeTruthy();
  });
});
