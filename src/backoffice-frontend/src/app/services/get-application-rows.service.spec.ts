import { TestBed, inject } from '@angular/core/testing';

import { GetApplicationRowsService } from './get-application-rows.service';

describe('GetApplicationRowsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetApplicationRowsService]
    });
  });

  it('should be created', inject([GetApplicationRowsService], (service: GetApplicationRowsService) => {
    expect(service).toBeTruthy();
  }));
});
