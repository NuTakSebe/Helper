import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  mode = "edit";

  stores = [];

  storeProducts = [];

  tableProducts = [];

  storeUUID = "333";

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
   console.log(product.uuid);
   this.modalService.open(content, {size: "lg"});
}

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    // TODO:
    // получить список магазинов
    this.stores = [{
      "uuid": "string11",
      "name": "string1",
      "address": "string"
    },
    {
      "uuid": "string22",
      "name": "string2",
      "address": "string"
    }];

    this.storeProducts = [{
      "uuid": "test",
      "code": "434",
      "barCodes": [33123123, 11111],
      "alcoCodes": [],
      "name": "44444",
      "price": 434,
      "quantity": 444,
      "costPrice": 0,
      "measureName": "шт",
      "tax": "VAT_0",
      "allowToSell": true,
      "description": "123123",
      "articleNumber": "",
      "parentUuid": "null",
      "group": false,
      "type": "NORMAL",
      "alcoholByVolume": 0,
      "alcoholProductKindCode": 0,
      "tareVolume": 0
    }, {
      "uuid": "te11st",
      "code": "434",
      "barCodes": [],
      "alcoCodes": [],
      "name": "tests14",
      "price": 434,
      "quantity": 444,
      "costPrice": 0,
      "measureName": "шт",
      "tax": "VAT_0",
      "allowToSell": true,
      "description": "123123",
      "articleNumber": "",
      "parentUuid": "null",
      "group": false,
      "type": "NORMAL",
      "alcoholByVolume": 0,
      "alcoholProductKindCode": 0,
      "tareVolume": 0
    }];

    this.tableProducts = this.storeProducts;

  }

}
