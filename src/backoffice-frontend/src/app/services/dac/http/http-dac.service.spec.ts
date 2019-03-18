import { TestBed } from '@angular/core/testing';

import { HttpDacService } from './http-dac.service';

describe('HttpDacService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpDacService = TestBed.get(HttpDacService);
    expect(service).toBeTruthy();
  });
});
