import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'

import { GetQueryParamService } from '../get-query-param.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [GetQueryParamService]
})
export class HomeComponent implements OnInit {

  constructor(private route: ActivatedRoute, private getQueryParamService : GetQueryParamService) {  }

  ngOnInit() {
    console.log(this.getQueryParamService.getParamByName(this.route, "token"));
  }

}
