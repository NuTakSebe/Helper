import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';



declare var XLSX: any;

@Component({
  selector: 'app-products-import-export',
  templateUrl: './products-import-export.component.html',
  styleUrls: ['./products-import-export.component.css']
})
export class ProductsImportExportComponent implements OnInit {

  XLSX: any;
  form: String = "";
	static jsonExcel = [];

  constructor() {}

	getJson(){
		return ProductsImportExportComponent.makeValid();
	}
  onSubmit(form: string) {
    console.log("Нажатие")
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
				alert("Error While Downloading")
      }
    };
  }

  handleFile(event: any) {
    // TODO проверить валидность расширения
    var rABS = true; // true: readAsBinaryString ; false: readAsArrayBuffer
    var files = event.target.files; // Забираем у event( нажатие ) список выбранных файлов. Возвращает ArrayList of Files
    var i, file; // Объявляем переменные для итерации и сам file
    file = files[0];
    var reader = new FileReader();
    var name = file.name;
    console.log("file name:" + name);
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
        let arr = ProductsImportExportComponent.fixdata(data);
        workbook =  XLSX.read(btoa(arr), {
          type: 'base64'
        });
      }
      var worksheet = workbook.Sheets[workbook.SheetNames[0]];
      ProductsImportExportComponent.jsonExcel = XLSX.utils.sheet_to_json(worksheet);

			// console.log(ProductsImportExportComponent.jsonExcel)
    };
    reader.readAsBinaryString(file);
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

  static makeValid() {
		
		let arrJs = [];
		if (ProductsImportExportComponent.jsonExcel.length !== 0) {
    for (let num in ProductsImportExportComponent.jsonExcel) {
      let prd = ProductsImportExportComponent.jsonExcel[num];
			console.log(prd);
			if (num != "0") {
				let errors = "";
				
        let uuid = "testUuid"; // TODO make uniq Uuid
        let code = "";
        if (prd["Код товара"].length <= 10) { code = prd["Код товара"]; }
        else {
          code = "NOT VALLID";
          errors += "Невалидное поле: Код Товара\n";
//          throw Error;
        }
				let barCode = prd["Штрихкоды"].replace(/ /g,"").split(",");
				
        let name = "NOT VALLID";
        if (prd["Наименование товара"].length <= 100 &&
          prd["Наименование товара"].length > 0) {
          name = prd["Наименование товара"];
        } else {
          errors += "Невалидное поле: Наименование товара\n";
//          throw Error;
        }
        let price = 0;
        let buff = parseFloat(prd["Отпускная цена"].replace(/,/g, ".").replace(/ /g,""));
        if (buff >= 0 && buff <= 9999999.99) { price = buff; }
        else {
          errors += "Невалидное поле: Отпускная цена\n";
//          throw Error;
        }
        let quantity = 0;
        let buffStr = prd["Количество товара в наличии(остаток)"];
				let arrSplit = buffStr.replace(/ /g,"").replace(/,/g, ".");
				if (arrSplit.length != 1) {
					if (buffStr.split(".")[1].length <= 3) { quantity = parseFloat(buffStr); }
					else {
						errors += "Невалидное поле: Количество товара в наличи\n";
//            throw Error;
					}
				}else {
          quantity = parseFloat(buffStr);
        }
				
        let costPrice = 0;
        buff = parseFloat(prd["Закупочная цена"].replace(/ /g,"").replace(/,/g, "."));
        if (buff >= 0 && buff <= 9999999.99) { costPrice = buff; }
        else {
          errors += "Невалидное поле: Закупочная цен\n";
//          throw Error;

        }
				
        let measureName = "NOT VALLID";
        buffStr = prd["Единица измерения"].replace(/ /g,"").toLowerCase();
        if (buffStr == "шт" || buffStr == "кг" || buffStr == "л" || buffStr == "м" || buffStr == "км" || buffStr == "м2" || buffStr == "м3" || buffStr == "компл" || buffStr == "упак" || buffStr == "ед" || buffStr == "дроб") {
   				measureName = buffStr;
        } else {
					errors += "Невалидное поле: Единица измерения\n";
//          throw Error;
        }
        let tax = "NOT VALLID";
        switch (prd["Ставка НДС"].toLowerCase()) {
          case "0": tax = "VAT_0"; break;
          case "8 б": tax = "VAT_18"; break;
          case "8 с": tax = "VAT_18_118"; break;
          case "10 б": tax = "VAT_10"; break;
          case "10 с": tax = "VAT_10_110"; break;
          default: errors += "Невалидное поле: Ставка НДС\n"; //throw Error;
        }
				
        let typePrd = "NOT VALLID";
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
					alcoCodes = ["NOT VALLID"];
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
          "articleNumber": prd["Артикул"] !== null? prd["Артикул"] : "",
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
				 console.log(json);
				arrJs.push(json);
      }
		}
  }
    // console.log(count);
		return arrJs;
  }

	static fixdata(data) {
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

  ngOnInit() {

  }

}
