import { TestBed, inject } from '@angular/core/testing';

import { FicheDataService } from './fiche-data.service';

describe('FicheDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FicheDataService]
    });
  });

  it('should ...', inject([FicheDataService], (service: FicheDataService) => {
    expect(service).toBeTruthy();
  }));
});
