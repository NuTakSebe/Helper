function upload(file) {
  console.log("Upload Started");
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/upload", true);
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
