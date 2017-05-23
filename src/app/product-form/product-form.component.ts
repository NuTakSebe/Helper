import { Component, OnInit } from '@angular/core';

import { GenerateUUID4Service } from '../generate-uuid4.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  providers: [GenerateUUID4Service]
})
export class ProductFormComponent implements OnInit {

  constructor(private generateUUID4: GenerateUUID4Service) { }

  measures = [
    {
      value: "" // для групп
    },
    {
      value: "шт",
      displayName: "Штуки"
    },
    {
      value: "кг",
      displayName: "Килограммы"
    },
    {
      value: "л",
      displayName: "Литры"
    },
    {
      value: "м",
      displayName: "Метры"
    },
    {
      value: "км",
      displayName: "Километры"
    },
    {
      value: "м2",
      displayName: "Квадратные метры"
    },
    {
      value: "м3",
      displayName: "Кубические метры"
    },
    {
      value: "компл",
      displayName: "Комплекты"
    },
    {
      value: "упак",
      displayName: "Упаковки"
    },
    {
      value: "ед",
      displayName: "Единицы"
    },
    {
      value: "дроб",
      displayName: "Дробное"
    }
  ]

  taxes = [
    {
      value: "NO_VAT" // для групп
    },
    {
      value: "VAT_0",
      displayName: "Без НДС"
    },
    {
      value: "VAT_10",
      displayName: "НДС 10%"
    },
    {
      value: "VAT_18",
      displayName: "НДС 18%"
    },
    {
      value: "VAT_10_110",
      displayName: "НДС с расчётной ставкой 10%"
    },
    {
      value: "VAT_18_118",
      displayName: "НДС с расчётной ставкой 18%"
    },
  ]

  types = [
    {
      value: "NORMAL",
      displayName: "Неалкогольный"
    },
    {
      value: "ALCOHOL_MARKED",
      displayName: "Маркированный алкоголь"
    },
    {
      value: "ALCOHOL_NOT_MARKED",
      displayName: "Немаркированный алкоголь"
    }
  ]

  barCodes = [];
  alcoCodes = [];

  product = {
    "uuid": this.generateUUID4.generate(),
    "code": "",
    "barCodes": this.barCodes,
    "alcoCodes": this.alcoCodes,
    "name": "",
    "price": 0,
    "quantity": 0,
    "costPrice": 0,
    "measureName": "шт",
    "tax": "VAT_0",
    "allowToSell": true,
    "description": "",
    "articleNumber": "",
    "parentUuid": "",
    "group": false,
    "type": "NORMAL",
    "alcoholByVolume": 0,
    "alcoholProductKindCode": 0,
    "tareVolume": 0
  };

  isAlco = false;

  updateAlco = function(isAlco) {
    if (!isAlco) {
      this.product.type = "NORMAL";
      this.product.alcoholByVolume = 0;
      this.product.alcoholProductKindCode = 0;
      this.product.tareVolume = 0;
      this.product.alcoCodes.length = 0;
    } else {
      this.product.type = "ALCOHOL_NOT_MARKED";
      this.product.alcoholByVolume = 0.001;
      this.product.alcoholProductKindCode = 1;
      this.product.tareVolume = 0.001;
    }
  }

  // TODO: ЗАПРОС
  shops = [];

  ngOnInit() {
    this.product.barCodes.push('test');
    this.product.alcoCodes.push('blah');
  }

}
