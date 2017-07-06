import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import { ActivatedRoute } from '@angular/router';

import { GetQueryParamService } from '../get-query-param.service';
import { EvotorRequestsService } from '../evotor-requests.service';
import { GenerateUUID4Service } from '../generate-uuid4.service';

declare var XLSX: any;

@Component({
  selector: 'app-products-import-export',
  templateUrl: './products-import-export.component.html',
  styleUrls: ['./products-import-export.component.css'],
  providers: [GetQueryParamService, EvotorRequestsService, GenerateUUID4Service]
})
export class ProductsImportExportComponent implements OnInit {

  visible: any;
  XLSX: any;
  form: String = "";
	jsonExcel : any = [];
  excel : any = [];
  storeUUID;

  toggle = false;

  token;
  stores;

	getJson(){
 		return this.makeValid();
  }

  onSubmit(form: string) {
    console.log("Нажатие")
    if (form === "") { alert("Выберете расширение"); stop; }
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/excel/download?for=' + form, true);
    xhr.responseType = 'blob';
    xhr.send(null);
    xhr.onload = function(e) {
      if (xhr.status === 200) {
        console.log(xhr.response);
        let blob;
        if (form === 'xlsx') {
          blob = new Blob([xhr.response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        } else {
          blob = new Blob([xhr.response], { type: 'application/vnd.ms-excel' });
        }
        let a = document.createElement("a");
        // a.style = "display: none";
        document.body.appendChild(a);
        // Create a DOMString representing the blob and point the link element towards it
        let url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = 'template.' + form;
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        console.log("Error Appeared while downloading " + xhr.status);
				alert("Error While Downloading");
      }
    };
  }

  handleFile(event: any) {
    var _this = this;
    // TODO проверить валидность расширения
    var rABS = true; // true: readAsBinaryString ; false: readAsArrayBuffer
    var files = event.target.files; // Забираем у event( нажатие ) список выбранных файлов. Возвращает ArrayList of Files
    var i, file; // Объявляем переменные для итерации и сам file
    file = files[0];
    var reader = new FileReader();
    var name = file.name;
    console.log("file name:" + name);
    if (file.type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.type =="application/vnd.ms-excel") {
      reader.onload = function(event: any) {

        var data = event.target.result; // Результат чтения объекта ( FileReader сделан по анологии с XMLHttpRequest ( метод send ) )
        var workbook;
        if (rABS) {
          /* if binary string, read with type 'binary' */
          workbook = XLSX.read(data, {
            type: 'binary'
          });
        } else {
          /* if array buffer, convert to base64 */
          let arr = _this.fixdata(data);
          workbook =  XLSX.read(btoa(arr), {
            type: 'base64'
          });
        }
        var worksheet = workbook.Sheets[workbook.SheetNames[0]];
        _this.jsonExcel = XLSX.utils.sheet_to_json(worksheet);

  			// console.log(ProductsImportExportComponent.jsonExcel)
      };
      reader.readAsBinaryString(file);
      }else {
        alert("Wrong type of file! Please choose the right one");
      }
  }
	// Метод, который надо дописать.
  sendInformation() {
      let arr = this.excel;
      let readyArray = [];
      let flag;
      for (let i = 0; i < arr.length; i++) {
        flag = true;
        for (let property in arr[i]) {
          if (arr[i][property] == "NOT_VALID") flag = false;
        }
        if (flag == true) readyArray.push(arr[i]);
      }
      this.evotorRequests.postItem(this.token, this.storeUUID, readyArray).subscribe((data : Response)=>{
        console.log("Ready Array:");
        console.log(readyArray);
      });

  }

	getType(str) {
		if (str === "NORMAL") return "обычный";
		if (str === "ALCOHOL_MARKED") return "маркированный алкоголь";
		if (str === "ALCOHOL_NOT_MARKED") return "немаркированный алкоголь";
	}

	getNDS(str) {
		if (str === "VAT_0") return "Без НДС";
		if (str === "VAT_10") return "НДС 10%";
		if (str === "VAT_18") return "НДС 18%";
		if (str === "VAT_10_110") return "НДС с расчетной ставкой 10%";
		if (str === "VAT_18_118") return "НДС с расчетной ставкой 18%";
	}

  makeValid() {
		let arrJs = [];
		if (this.jsonExcel.length !== 0) {
    for (let num in this.jsonExcel) {
      let prd = this.jsonExcel[num];

			if (num != "0" && num != "1") {
        console.log(prd);
				let errors = "";
				let buff;
        let uuid = this.generateUUID4.generate(); // TODO make uniq Uuid
        let code = "";

        if (prd["Код товара"].length <= 10) { code = prd["Код товара"]; }
        else {
          code = "NOT VALLID";
          errors += "Невалидное поле: Код Товара\n";
        }

        console.log(prd['Штрихкоды']);
				let barCode = "NOT_VALLID"; 
        if (prd['Штрихкоды']) {
          prd['Штрихкоды'].replace(/ /g,"").split(",");
        };

        let articleNumber = "NOT_VALLID"
        if (prd["Артикул"] == null) articleNumber = "";
        else {
          if (prd["Артикул"].length <= 20){
            articleNumber =  prd["Артикул"];
          }else { errors += "Невалидное поле: Артикул\n"}
        }
        let name = "NOT VALLID";
        if (prd["Наименование товара"].length <= 100 &&
          prd["Наименование товара"].length > 0) {
          name = prd["Наименование товара"];
        } else {
          errors += "Невалидное поле: Наименование товара\n";
        }

        let price;
        let buffStr = prd["Отпускная цена"].replace(/,/g, ".").replace(/ /g,"");
        let arrSplit = buffStr.split(".");
        if (arrSplit[1] != undefined) {
          if (arrSplit[1].length < 3) {
            buffStr = parseFloat(buffStr);
            if (buffStr >= 0 && buffStr <= 9999999.99) { price = parseFloat(buffStr); }
            else {
              price = "NOT_VALLID";
              errors += "Невалидное поле: Отпускная цена\n";
            }
          }else {
            errors += "Невалидное поле: Отпускная цена\n";
            price = "NOT_VALLID";
          }
        }else { price = parseFloat(buffStr); }

        let quantity;
        buffStr = prd["Количество товара в наличии(остаток)"].replace(/,/g, ".").replace(/ /g,"");
				arrSplit = buffStr.split(".");
				if (arrSplit.length != 1) {
					if (buffStr.split(".")[1].length <= 3) { quantity = parseFloat(buffStr); }
					else {
            quantity = "NOT_VALLID";
						errors += "Невалидное поле: Количество товара в наличи\n";
					}
				}else {
          quantity = parseFloat(buffStr);
        }

        let costPrice;
        buffStr = prd["Закупочная цена"].replace(/,/g, ".").replace(/ /g,"");
        arrSplit = buffStr.split(".");
        if (arrSplit[1] != undefined) {
          if (arrSplit[1].length < 3) {
            buffStr = parseFloat(buffStr);
            if (buffStr >= 0 && buffStr <= 9999999.99) { costPrice = parseFloat(buffStr); }
            else {
              costPrice = "NOT_VALLID";
              errors += "Невалидное поле: Отпускная цена\n";
            }
          }else {
            errors += "Невалидное поле: Отпускная цена\n";
            costPrice = "NOT_VALLID";
          }
        }else { costPrice = parseFloat(buffStr); }

        let measureName = "NOT_VALLID";
        buffStr = prd["Единица измерения"].replace(/ /g,"").toLowerCase();
        if (buffStr == "шт" || buffStr == "кг" || buffStr == "л" || buffStr == "м" || buffStr == "км" || buffStr == "м2" || buffStr == "м3" || buffStr == "компл" || buffStr == "упак" || buffStr == "ед" || buffStr == "дроб") {
   				measureName = buffStr;
        } else {
					errors += "Невалидное поле: Единица измерения\n";
        }
        let tax = "NOT_VALLID";
        switch (prd["Ставка НДС"].toLowerCase()) {
          case "0": tax = "VAT_0"; break;
          case "8 б": tax = "VAT_18"; break;
          case "8 с": tax = "VAT_18_118"; break;
          case "10 б": tax = "VAT_10"; break;
          case "10 с": tax = "VAT_10_110"; break;
          default: errors += "Невалидное поле: Ставка НДС\n"; //throw Error;
        }

        let typePrd = "NOT_VALLID";
        switch (prd["Тип товара"].toLowerCase()) {
          case "обычный": typePrd = "NORMAL"; break;
          case "маркированный алкоголь": typePrd = "ALCOHOL_MARKED"; break;
          case "немаркированный алкоголь": typePrd = "ALCOHOL_NOT_MARKED"; break;
          default: errors += "Невалидное поле: Тип товара" + name + "\n"; //throw Error;
        }

        let allowToSell = false;
        switch (prd["Доступности товара для продажи"].replace(/ /g,"").toLowerCase()) {
          case "да": allowToSell = true; break;
          case "нет": allowToSell = false; break;
          default: errors += "Невалидное поле: Доступность для продажи\n"; //throw Error;
        }

				let alcoCodes = [];
				let alcholByVolume = 0;
				let alchoholProductKindCode = 0;
				let tareVolume = 0;
				if (typePrd !== "NORMAL") {
					alcoCodes = ["NOT_VALLID"];
					if (prd["Коды алкогольной продукции ЕГАИС"] !== null) {
						alcoCodes = prd["Коды алкогольной продукции ЕГАИС"].replace(/ /g,"").replace(/,/g,".").split(".");
					}else {
						errors += "Невалидное поле: Коды алкогольной продукции ЕГАИС";
					}

					alcholByVolume = -1;
					buffStr =  prd["Крепкость алкогольной продукции"].replace(/ /g,"").replace(/,/g,".");
					arrSplit = buffStr.split(".");
					if (arrSplit.length != 1) {
						if (arrSplit[1].length <= 3) { alcholByVolume = parseFloat(buffStr);  }
						else { errors += "Невалидное поле: Крепость алкогольной продукции\n"; }
					}else { alcholByVolume = parseFloat(buffStr); }

					let buffN = parseInt(prd["Код вида алкогольной продукции ФСРАР"].replace(/ /g,""));
					if ( buffN> 0 && prd["Код вида алкогольной продукции ФСРАР"] < 1000) {alchoholProductKindCode = buffN;}
					else { errors += "Невалидное поле: Код вида алкогольной продукции ФСРАР\n"}

					tareVolume = -2;
					buffStr =  prd["Ёмкость тары алкогольной продукции в литрах"].replace(/ /g,"").replace(/,/g,".");
					arrSplit = buffStr.split(".");
					if (arrSplit.length != 1) {
						if (arrSplit[1].length <= 3) { tareVolume = parseFloat(buffStr);  }
						else { errors += "Невалидное поле: Ёмкость тары алкогольной продукции в литрах\n"; }
					}else { alcholByVolume = parseFloat(buffStr); }
				}

        let json = {
          "uuid": uuid,
          "code": code,
          "barCodes": barCode,
          "alcoCodes": alcoCodes,
          "name": name,
          "price": price,
          "quantity": quantity,
          "costPrice": costPrice,
          "measureName": measureName,
          "tax": tax,
          "allowToSell": allowToSell,
          "description": prd["Описание товара"] !== null ? prd["Описание товара"] : "",
          "articleNumber": articleNumber,
          "parentUuid": "",
          "group": false,
          "type": typePrd,
          "alcoholByVolume": alcholByVolume,
          "alcoholProductKindCode": alchoholProductKindCode,
          "tareVolume": tareVolume
        }

				if (errors != "") {
					alert(errors);
				}
				// console.log(json); a
				arrJs.push(json);
      }
		}
  }
    this.excel = arrJs;
    // console.log("DONE\n");
    // console.log(ProductsImportExportComponent.excel);
		return arrJs;
  }

	fixdata(data) {
    console.log("hi")
    var o = "",
      l = 0,
      w = 10240;
    for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
    o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
    return o;
  }

  static upload(file) {
    console.log("Upload Started");
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/excel/upload", true);
    console.log("Sending file Started");
    xhr.send(file);
    return xhr.status;
  }

  constructor(private generateUUID4 : GenerateUUID4Service, private getQueryParam : GetQueryParamService, private evotorRequests : EvotorRequestsService, private route : ActivatedRoute) {}

  ngOnInit() {
    this.token = this.getQueryParam.getParamByName(this.route, 'token');

    this.evotorRequests.getStores(this.token).subscribe((data : Response) => this.stores = data.json());
  }

}
