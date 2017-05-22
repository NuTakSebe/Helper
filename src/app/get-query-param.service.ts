import { Injectable } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

@Injectable()
export class GetQueryParamService {

  getParamByName(route : ActivatedRoute, name) {
    return route.snapshot.queryParams[name];
  }

  constructor() { }

}
