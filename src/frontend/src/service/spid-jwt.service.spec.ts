import { TestBed } from '@angular/core/testing';

import { SpidJwtService } from './spid-jwt.service';

describe('SpidJwtService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpidJwtService = TestBed.get(SpidJwtService);
    expect(service).toBeTruthy();
  });
});
