window.onload = function() {

  function upload(file) {
    console.log("Upload Started");
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/excel/upload", true);
    console.log("Sending file Started");
    console.log(file);
    xhr.send(file);

  }

  var rABS = true; // true: readAsBinaryString ; false: readAsArrayBuffer

  function handleFile(event) {

    var files = event.target.files; // Забираем у event( нажатие ) список выбранных файлов. Возвращает ArrayList of Files
    var i, file; // Объявляем переменные для итерации и сам file
    // for (i = 0; i != files.length; ++i) {
    file = files[0];
    var reader = new FileReader();
    var name = file.name;
    console.log("file name:" + name);
    reader.onload = function(event) {
      var data = event.target.result; // Результат чтения объекта ( FileReader сделан по анологии с XMLHttpRequest ( метод send ) )

      var workbook;
      if (rABS) {
        /* if binary string, read with type 'binary' */
        workbook = XLSX.read(data, {
          type: 'binary'
        });
      } else {
        /* if array buffer, convert to base64 */
        var arr = fixdata(data);
        workbook = XLSX.read(btoa(arr), {
          type: 'base64'
        });
      }
      var worksheet = workbook.Sheets[workbook.SheetNames[0]];
      jsonExcel = XLSX.utils.sheet_to_json(worksheet);
      // console.log(jsonExcel);
      upload(jsonExcel);
    };
    reader.readAsBinaryString(file);
    // }
  }
  /* processing array
  buffers, only required for readAsArrayBuffer */
  function fixdata(data) {
    var o = "",
      l = 0,
      w = 10240;
    for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
    o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
    return o;
  }

  InputFiles.addEventListener('change', handleFile, false); // По id вешаем eventListner на change, ф-ия,

  document.querySelector('#formd').addEventListener('submit', (e)=>{
    e.preventDefault();

        var format = document.querySelector("input[name=format]:checked").value;
        let xhr = new XMLHttpRequest();
        let url = '/excel/download?for=' + format;
        xhr.open('POST', url);
        xhr.responseType = 'blob';
        xhr.send(null);
        xhr.onload = function(e) {
        if (this.status == 200) {
            console.log(this.response);
            var blob;
            if (format === 'xlsx'){
              blob = new Blob([this.response], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
            }else{
              blob = new Blob([this.response], {type: 'application/vnd.ms-excel'});
            }
            let a = document.createElement("a");
            a.style = "display: none";
            document.body.appendChild(a);
            //Create a DOMString representing the blob and point the link element towards it
            let url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = 'template.' + format;
            a.click();
            window.URL.revokeObjectURL(url);
        }else{
            console.log("Error Appeared while downloading " + this.status )
        }
    };
});
};
