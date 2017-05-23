import { TestBed, inject } from '@angular/core/testing';

import { GenerateUUID4Service } from './generate-uuid4.service';

describe('GenerateUUID4Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GenerateUUID4Service]
    });
  });

  it('should be created', inject([GenerateUUID4Service], (service: GenerateUUID4Service) => {
    expect(service).toBeTruthy();
  }));
});
