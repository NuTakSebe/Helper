import { TestBed, inject } from '@angular/core/testing';

import { EvotorRequestsService } from './evotor-requests.service';

describe('EvotorRequestsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EvotorRequestsService]
    });
  });

  it('should be created', inject([EvotorRequestsService], (service: EvotorRequestsService) => {
    expect(service).toBeTruthy();
  }));
});
