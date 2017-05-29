import { Component, OnInit, Input } from '@angular/core';

import { GenerateUUID4Service } from '../generate-uuid4.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  providers: [GenerateUUID4Service]
})
export class ProductFormComponent implements OnInit {
  @Input() mode;
  @Input() oldProduct;
  @Input() storeUUID;

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
  ];

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
  ];

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
  ];

  emptyProduct = {
    "uuid": this.generateUUID4.generate(),
    "code": "",
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
    "parentUuid": null,
    "group": false,
    "type": "NORMAL",
    "alcoholByVolume": 0,
    "alcoholProductKindCode": 0,
    "tareVolume": 0
  };

  product = Object.assign({}, this.emptyProduct);

  isAlco = false;

  // обновляет поля product при снятии/установлении галочки алкотовара
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

  updateGroup = function() {
    if (this.product.group) {
      this.product.barCodes.length = 0;
      this.product.alcoCodes.length = 0;
      this.product.quantity = 0;
      this.product.price = 0;
      this.product.costPrice = 0;
      this.product.description = "";
      this.product.measureName = "";
      this.product.tax = "NO_VAT";
      this.product.allowToSell = true;
      this.product.articleNumber = "";
      this.product.alcoholByVolume = 0;
      this.product.alcoholProductKindCode = 0;
      this.product.tareVolume = 0;
    } else {
      this.product.measureName = "шт";
      this.product.tax = "VAT_0";
    }
  }

  stores = [];

  storeGroups = [];

  errorNoStores = false;
  errorNoGroups = false;

  updateGroups = function(storeUUID) {
    this.storeGroups = [];
    // TODO: ЗАПРОС
    this.storeGroups = [{
      "uuid": "group1",
      "name": "name"
    }];

    if (!(this.storeGroups[0])) {
      this.errorNoGropes = true;
    }
  };

  submitFunction;

  constructor(private generateUUID4: GenerateUUID4Service) { }

  ngOnInit() {
    if (this.mode === 'add') {
      // TODO:

      // получить магазины
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

      // если магазинов нет - заблокировать форму
      if (!(this.stores[0])) {
        this.errorNoStores = true;
      } else {
        this.storeUUID = this.stores[0].uuid;
      }

      // после выбора магазина получить группы - это делает updateGroups;

      // на сабмит вешаем отправку
      this.submitFunction = function() {
        alert(this.mode);
        this.product = Object.assign({}, this.emptyProduct);
        this.isAlco = false;
        this.product.barCodes.length = 0;
        this.product.alcoCodes.length = 0;
        window.scrollTo(0,0);
      }
    } else if (this.mode === 'edit') {
      // TODO:

      // запихать переданный объект в product
      this.product = Object.assign({}, this.oldProduct);

      // получить группы по магазину
      this.storeGroups = [{
        "uuid": "group1",
        "name": "name"
      }];

      // на сабмит навесить удаление и отправку
      this.submitFunction = function() {
        alert(this.mode);
      }
    }
  }

}
