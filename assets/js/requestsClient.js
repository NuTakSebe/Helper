function updateItem(storeUuid, token, itemObj, succesFunc, failFunc) {
  let itemUuid = itemObj.uuid;
  deleteItem(storeUuid, token, itemUuid, succesFunc, failFunc);
  postItem(storeUuid, token, itemObj, succesFunc, failFunc);
}

function postItem(storeUuid, token, itemObj, succesFunc, failFunc){
  let reqString = "http://api.evotor.ru/api/v1/inventories/stores/"+storeUuid+"/products";
  $.ajax({
    url: reqString,
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': token
    },
    method: 'POST',
    dataType: 'json',
    data: [itemObj],
  })
    .done((status)=>{
      if(status==200){
        succesFunc();
      }else{
        failFunc();
      }
    });
}

function deleteItem(storeUuid, token, itemUuid, succesFunc, failFunc) {
  let reqString = "http://api.evotor.ru/api/v1/inventories/stores/"+storeUuid+"/products/delete";
  $.ajax({
    url: reqString,
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': token
    },
    method: 'POST',
    dataType: 'json',
    data: [itemUuid],
  })
    .done(succesFunc())
    .fail(failFunc());
}

function getStores(token, failFunc){
  let reqString = "https://api.evotor.ru/api/v1/inventories/stores/search";
  $.ajax({
    url: reqString,
    headers: {
      'X-Authorization': token
    },
    method: 'GET',
    dataType: 'json',
    success: function(data){
      return JSON.parse(data);
    }
  })
    .fail(failFunc());
}

function getItems(storeUuid, token, failFunc){
  let reqString = "https://api.evotor.ru/api/v1/inventories/stores/"+storeUuid+"/products";
  var items = [];
  $.ajax({
    url: reqString,
    headers: {
      'X-Authorization': token
    },
    method: 'GET',
    dataType: 'json',
    success: function(data){
      var itemsArray = JSON.parse(data);
      $.each(itemsArray, function (index, value) {
          if (!itemsArray[index].group){
              items.push(itemsArray[index]);
          }
      });
      return items;
    }
  })
    .fail(failFunc());
}

function getGroups(storeUuid, token, failFunc){
  let reqString = "https://api.evotor.ru/api/v1/inventories/stores/"+storeUuid+"/products";
  var groups = [];
  $.ajax({
    url: reqString,
    headers: {
      'X-Authorization': token
    },
    method: 'GET',
    dataType: 'json',
    success: function(data){
      var itemsArray = JSON.parse(data);
      $.each(itemsArray, function (index, value) {
          if (itemsArray[index].group){
              items.push(itemsArray[index]);
          }
      });
      return groups;
    }
  })
    .fail(failFunc());
}

function getAllFromStore(storeUuid, token, failFunc){
  let reqString = "https://api.evotor.ru/api/v1/inventories/stores/"+storeUuid+"/products";
  $.ajax({
    url: reqString,
    headers: {
      'X-Authorization': token
    },
    method: 'GET',
    dataType: 'json',
    success: function(data){
      return JSON.parse(data);
    }
  })
    .fail(failFunc());
}
