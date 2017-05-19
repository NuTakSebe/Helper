function updateItem(storeUuid, token, itemObj) {
  let itemUuid = itemObj.uuid;
  deleteItem(storeUuid, token, itemUuid);
  postItem(storeUuid, token, itemObj);
}

function postItem(storeUuid, token, itemObj){
  let reqString = "http://api.evotor.ru/api/v1/inventories/stores/"+storeUuid+"/products";
  let xhr = new XMLHttpRequest();
  console.log("req open");
  xhr.open("POST", reqString , true);
  xhr.onreadystatechange = function() {
    if(xhr.readyState!=4) return;
    if(xhr.status == 200){
      console.log(xhr.responseText);
    }else {
      handleError(xhr.statusText);
    }
  };
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('X-Authorization', token);
  xhr.send([itemObj]);
}

function deleteItem(storeUuid, token, itemUuid) {
  let reqString = "http://api.evotor.ru/api/v1/inventories/stores/"+storeUuid+"/products/delete";
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
  };
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('X-Authorization', token);
  xhr.send([itemUuid]);
}

function getStores(token){
  let reqString = "https://api.evotor.ru/api/v1/inventories/stores/search";
  let stores = "";
  let xhr = new XMLHttpRequest();
  xhr.open("GET", reqString, true);
  xhr.onreadystatechange = function() {
    if(xhr.readyState!=4) return;
    if(xhr.status == 200 && responseText!=null){
      console.log(xhr.responseText);
      stores += xhr.responseText;
    }else {
      handleError(xhr.statusText);
    }
  };
  xhr.setRequestHeader('X-Authorization', token);
  xhr.send(null);
  return JSON.parse(stores);
}

function getItems(storeUuid, token){
  let reqString = "https://api.evotor.ru/api/v1/inventories/stores/"+storeUuid+"/products";
  var items = [];
  let xhr = new XMLHttpRequest();
  xhr.open("GET", reqString, true);
  xhr.onreadystatechange = function() {
    if(xhr.readyState!=4) return;
    if(xhr.status == 200 && responseText!=null){
      console.log(xhr.responseText);
      var itemsArray = JSON.parse(xhr.responseText);
      $.each(itemsArray, function (index, value) {
        if (!itemsArray[index].group){
          items.push(itemsArray[index]);
        }
      });
    }else {
      handleError(xhr.statusText);
    }
  };
  xhr.setRequestHeader('X-Authorization', token);
  xhr.send(null);
  return items;
}

function getGroups(storeUuid, token){
  let reqString = "https://api.evotor.ru/api/v1/inventories/stores/"+storeUuid+"/products";
  var groups = [];
  let xhr = new XMLHttpRequest();
  xhr.open("GET", reqString, true);
  xhr.onreadystatechange = function() {
    if(xhr.readyState!=4) return;
    if(xhr.status == 200 && responseText!=null){
      console.log(xhr.responseText);
      var itemsArray = JSON.parse(xhr.responseText);
      $.each(itemsArray, function (index, value) {
        if (itemsArray[index].group){
          groups.push(itemsArray[index]);
        }
      });
    }else {
      handleError(xhr.statusText);
    }
  };
  xhr.setRequestHeader('X-Authorization', token);
  xhr.send(null);
  return groups;
}

function getAllFromStore(storeUuid, token){
  let reqString = "https://api.evotor.ru/api/v1/inventories/stores/"+storeUuid+"/products";
  let itemsAndGroups = "";
  let xhr = new XMLHttpRequest();
  xhr.open("GET", reqString, true);
  xhr.onreadystatechange = function() {
    if(xhr.readyState!=4) return;
    if(xhr.status == 200 && responseText!=null){
      console.log(xhr.responseText);
      itemsAndGroups += responseText;
    }else {

      handleError(xhr.statusText);
    }
  };
  xhr.setRequestHeader('X-Authorization', token);
  xhr.send(null);
  return JSON.parse(itemsAndGroups);
}

function handleError(message) {
  alert("Ошибка: "+message);
}
