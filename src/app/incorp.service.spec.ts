import { TestBed, inject } from '@angular/core/testing';

import { IncorpService } from './incorp.service';

describe('IncorpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IncorpService]
    });
  });

  it('should be created', inject([IncorpService], (service: IncorpService) => {
    expect(service).toBeTruthy();
  }));
});
