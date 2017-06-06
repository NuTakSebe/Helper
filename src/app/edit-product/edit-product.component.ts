import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { ActivatedRoute } from '@angular/router';

import{ Response } from '@angular/http';

import { GetQueryParamService } from '../get-query-param.service';
import { EvotorRequestsService } from '../evotor-requests.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
  providers: [GetQueryParamService, EvotorRequestsService]
})
export class EditProductComponent implements OnInit {
  mode = "edit";

  stores = [];

  storeProducts = [];

  tableProducts = [];

  storeUUID = "333";

  path = [];

  oldProduct = {
    "uuid": 4234234,
    "code": "",
    "barCodes": [123123123, 123123, 5555],
    "alcoCodes": [],
    "name": "ttetst",
    "price": 5555,
    "quantity": 234,
    "costPrice": 0,
    "measureName": "шт",
    "tax": "VAT_0",
    "allowToSell": true,
    "description": "",
    "articleNumber": "",
    "parentUuid": "null",
    "group": false,
    "type": "NORMAL",
    "alcoholByVolume": 0,
    "alcoholProductKindCode": 0,
    "tareVolume": 0
  }

  deleteProduct(productUUID) {
    console.log(productUUID);

    // TODO:
    // запрос на удаление
    // удалить товар из массивов тут
    }

    openForm(content, product) {
     this.modalService.open(content, {size: "lg"});
     this.oldProduct = Object.assign({}, product);
    }

   openAlert(content, product) {
     console.log(product.name);
     this.modalService.open(content, {size: "lg"});
   }

   token;

   getItems = function(storeUUID) {
     this.evotorRequests.getItems(this.token, storeUUID).subscribe((data : Response) =>  {
       this.storeProducts = this.evotorRequests.buildObjectTree(data.json(), "uuid", "parentUuid");
       this.tableProducts = this.storeProducts;
       console.log(this.storeProducts);
     });
   }

   productClick = function(product, editModal) {
     if (product.group === true) {
       this.tableProducts = product.Children;
       this.path.push(product);
     }
   }

   backClick = function() {
     if (this.path.length > 2) {
       this.tableProducts = this.path[this.path.length-1].Children;
     } else {
       this.tableProducts = this.storeProducts;
     }
     this.path.length -= 1;
   }

  constructor(private modalService: NgbModal, private getQueryParam : GetQueryParamService, private evotorRequests : EvotorRequestsService, private route : ActivatedRoute) { }

  ngOnInit() {
    this.token = this.getQueryParam.getParamByName(this.route, 'token');

    this.evotorRequests.getStores(this.token).subscribe((data : Response) => this.stores = data.json());

  }

}
