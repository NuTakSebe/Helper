import { TestBed, inject } from '@angular/core/testing';

import { GetQueryParamService } from './get-query-param.service';

describe('GetQueryParamService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetQueryParamService]
    });
  });

  it('should be created', inject([GetQueryParamService], (service: GetQueryParamService) => {
    expect(service).toBeTruthy();
  }));
});
