function postItemsToStore(storeUuid, token, itemObj){
    let reqString = "http://api.evotor.ru/api/v1/inventories/stores/"+storeUuid+"/products";
    let xhr = new XMLHttpRequest();

    console.log("req open");
    xhr.open("POST", reqString , true);
    xhr.onreadystatechange = function() {
      if(xhr.readyState!=4) return;
      if(xhr.status == 200){
        console.log(xhr.responseText);
      }else {
        console.log(xhr.responseText);
        handleError(xhr.statusText);

      }
    }
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-Authorization', token);
    xhr.send(JSON.stringify(itemObj));
}

function handleError(message) {
    console.log("Ошибка: "+message);
}
