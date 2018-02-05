import { TestBed, inject } from '@angular/core/testing';

import { SearchCitiesAndPlacesService } from './search-cities-and-places.service';

describe('SearchCtiesAndPlacesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchCitiesAndPlacesService]
    });
  });

  it('should be created', inject([SearchCitiesAndPlacesService], (service: SearchCitiesAndPlacesService) => {
    expect(service).toBeTruthy();
  }));
});
