import { TestBed, inject } from '@angular/core/testing';

import { BlaBlaCarService } from './bla-bla-car.service';

describe('BlaBlaCarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlaBlaCarService]
    });
  });

  it('should be created', inject([BlaBlaCarService], (service: BlaBlaCarService) => {
    expect(service).toBeTruthy();
  }));
});
