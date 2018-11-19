import { TestBed, inject } from '@angular/core/testing';

import { IncorpStepperService } from './incorp-stepper.service';

describe('IncorpStepperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IncorpStepperService]
    });
  });

  it('should be created', inject([IncorpStepperService], (service: IncorpStepperService) => {
    expect(service).toBeTruthy();
  }));
});
