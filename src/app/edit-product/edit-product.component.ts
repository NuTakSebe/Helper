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

  storeUUID;

  path = [];

  tempProduct : any;

  oldProduct = {
    "uuid": "",
    "code": 0,
    "barCodes": [],
    "alcoCodes": [],
    "name": "",
    "price": 0,
    "quantity": 0,
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
  };

  updateItems() {
    this.evotorRequests.getItems(this.token, this.storeUUID).subscribe((data : Response) =>  {
      this.storeProducts = this.evotorRequests.buildObjectTree(data.json(), "uuid", "parentUuid");

      if (this.path.length > 0) {
        this.tableProducts = this.path[this.path.length-1].Children;
      } else {
        this.tableProducts = this.storeProducts;
      }
      
    });
  };

  deleteProduct() {
    let that = this;
    this.evotorRequests.deleteItem(this.token, this.storeUUID, this.tempProduct.uuid)
    .subscribe(
      function() { that.updateItems()  }
    );
  };

  openForm(content, product) {
     this.modalService.open(content, {size: "lg"});
     this.oldProduct = Object.assign({}, product);
    }

  openAlert(content, product) {
     this.modalService.open(content, {size: "lg"});
     this.tempProduct = Object.assign({}, product);
   }

   token;

   getItems = function(storeUUID) {
     this.evotorRequests.getItems(this.token, storeUUID).subscribe((data : Response) =>  {
       this.storeProducts = this.evotorRequests.buildObjectTree(data.json(), "uuid", "parentUuid");
       this.tableProducts = this.storeProducts;
     });
   };

   productClick = function(product, editModal) {
     if (product.group === true) {
       this.path.push(product);
       this.tableProducts = product.Children;
     } else {
       this.openForm(editModal, product);
     }
   };

   backClick = function() {
     if (this.path.length > 1) {
       this.tableProducts = this.path[this.path.length-2].Children;
     } else {
       this.tableProducts = this.storeProducts;
     }
     this.path.length -= 1;
   };

  constructor(private modalService: NgbModal, private getQueryParam : GetQueryParamService, private evotorRequests : EvotorRequestsService, private route : ActivatedRoute) { }

  ngOnInit() {
    this.token = this.getQueryParam.getParamByName(this.route, 'token');

    this.evotorRequests.getStores(this.token).subscribe((data : Response) => this.stores = data.json());

  }

}
