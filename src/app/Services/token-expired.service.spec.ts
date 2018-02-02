import { TestBed, inject } from '@angular/core/testing';

import { TokenExpiredService } from './token-expired.service';

describe('TokenExpiredService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenExpiredService]
    });
  });

  it('should be created', inject([TokenExpiredService], (service: TokenExpiredService) => {
    expect(service).toBeTruthy();
  }));
});
