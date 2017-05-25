function upload(file) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/upload", true);
  //обработчик закачаки
  xhr.upload.onprogress = function(event) {
    if (xhr.readyState == 4) {
      if (xhr.upload.status == 200) {
        console.log("success");
      } else {
        console.log("error1" + xhr.upload.status);
      }
    }
  };
  xhr.send(file);
  xhr.end("All");
}
