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
  form: String= "";
  jsonExcel = {
    "name": "Developer",
    "party": "Development"
  };

  constructor(private http: Http) {}

  onSubmit(form: string) {
    const body = null;
    console.log("Нажатие")
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/excel/download?for=' + form, true);
    xhr.responseType = 'blob';
    xhr.send(null);
    xhr.onload = function(e) {
      if (xhr.status == 200) {
        console.log(xhr.response);
        var blob;
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
        console.log("Error Appeared while downloading " + xhr.status)
      }
    };
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

  handleFile(event: any, jsonExcel: any) {
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
        var arr = ProductsImportExportComponent.fixdata(data);
        workbook = XLSX.read(btoa(arr), {
          type: 'base64'
        });
      }
      var worksheet = workbook.Sheets[workbook.SheetNames[0]];
      jsonExcel = XLSX.utils.sheet_to_json(worksheet);
      console.log("Tralala")
      console.log(jsonExcel);

      // ProductsImportExportComponent.upload(jsonExcel);
      console.log(status);
    };
    reader.readAsBinaryString(file);
  }
  /* processing array
  buffers, only required for readAsArrayBuffer */


  ngOnInit() {

  }

}
