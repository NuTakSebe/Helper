function updateItem(storeUuid, token, itemObj, successFunc, failFunc) {
  let itemUuid = itemObj.uuid;
  deleteItem(storeUuid, token, itemUuid, successFunc, failFunc);
  postItem(storeUuid, token, itemObj, successFunc, failFunc);
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
        successFunc();
      }else{
        failFunc();
      }
    });
}

function deleteItem(storeUuid, token, itemUuid, successFunc, failFunc) {
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
    .done((status)=>{
        if(status==200){
          successFunc();
        }else{
          failFunc();
        }
      });
}

function getStores(token, stores, fillFunc, failFunc){
  let reqString = "https://api.evotor.ru/api/v1/inventories/stores/search";
  $.ajax({
    url: reqString,
    headers: {
      'X-Authorization': token
    },
    method: 'GET',
    dataType: 'json',
    success: (data)=>{
      $.each(data, (index, value)=>{
        stores.push(data[index]);
      });
    }
  }).done(()=>{
      fillFunc(stores);
    })
    .fail(()=>{
      failFunc();
    });
}

function getItems(storeUuid, token, items, fillFunc, failFunc){
  let reqString = "https://api.evotor.ru/api/v1/inventories/stores/"+storeUuid+"/products";
  $.ajax({
    url: reqString,
    headers: {
      'X-Authorization': token
    },
    method: 'GET',
    dataType: 'json',
    success: (data)=>{
      $.each(data, (index, value)=> {
          if (!data[index].group){
              items.push(data[index]);
          }
      });
    }
  }).done(()=>{
      fillFunc(items);
    })
    .fail(()=>{
      failFunc();
    });
}

function getGroups(storeUuid, token, groups, fillFunc, failFunc){
  let reqString = "https://api.evotor.ru/api/v1/inventories/stores/"+storeUuid+"/products";

  $.ajax({
    url: reqString,
    headers: {
      'X-Authorization': token
    },
    method: 'GET',
    dataType: 'json',
    success: (data)=>{
      $.each(data, (index, value)=> {
          if (!data[index].group){
              groups.push(data[index]);
          }
      });
    }
  }).done(()=>{
      fillFunc(groups);
    })
    .fail(()=>{
      failFunc();
    });
}

function getAllFromStore(storeUuid, token, items, fillFunc, failFunc){
  let reqString = "https://api.evotor.ru/api/v1/inventories/stores/"+storeUuid+"/products";
  $.ajax({
    url: reqString,
    headers: {
      'X-Authorization': token
    },
    method: 'GET',
    dataType: 'json',
    success: (data)=>{
      $.each(data, (index, value)=> {
          items.push(data[index]);
      });
    }
  }).done(()=>{
      fillFunc(items);
    })
    .fail(()=>{
      failFunc();
    });
}
