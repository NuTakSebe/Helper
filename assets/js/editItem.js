window.onload = function() {
  var laststore; // сохраняем выбранный магазин для доступа к его uuid в массиве товаров
  var lastItem; // сохраняем выбранный товар для доступа к его uuid в массиве товаров

  function failFunc() {
    alert("Произошла ошибка, попробуйте снова");
  };

  function successFunc() {
    alert("Запрос выполнен");
  };

  var storesList = [];
  var itemsList = [];

  var fillstoresTable = function(stores) {
    storesList.forEach(function(store, i, array) {
      var tr = $("<tr/>").appendTo($("#storesContainer tbody"));
      tr.attr("id", i);
      tr.append("<td>" + store.name + "</td>");
      tr.append("<td>" + store.address + "</td>");
    });
  };

  var fillItemstable = function(storeUuid, items) {
    $("#itemsContainer tbody").empty();
    itemsList.forEach(function(item, i, array) {
      var tr = $("<tr/>").appendTo($("#itemsContainer tbody"));
      tr.append("<td>" + item.code + "</td>");
      tr.append("<td>" + item.name + "</td>");
      tr.append("<td>" + item.description + "</td>");
      tr.append(
        "<td><button type='button' class='btn btn-primary btn-sm btnEdit' id='" + i + "'data-toggle='modal' data-target='#itemModal'>Изменить</button></td>"
      );
      tr.append(
        "<td><button type='button' class='btn btn-secondary btn-sm btnDelete' id='" + i + "'>Удалить</button></td>"
      );
    });

    // обработчик кнопки "изменить"
    $('.btnEdit').click(function(event) {
      clearForm();
      fillItemForm($(this).attr("id"));
      lastItem = $(this).attr("id");
    });

    // обработчик кнопки "удалить"
    $('.btnDelete').click(function(event) {
      deleteItem(storesList[laststore].uuid, token, itemsList[$(this).attr("id")].uuid, successFunc, failFunc);
      getItems(storesList[laststore].uuid, token, itemsList, fillItemstable, failFunc);
    });
  };

  var fillItemForm = function(id) {
    if (itemsList[id].type !== 'NORMAL') {
      alcoOn();
    } else {
      alcoOff();
    }
    $("#name").val(itemsList[id].name);
    $("#code").val(itemsList[id].code);
    $("#articleNumber").val(itemsList[id].articleNumber);

    $("#name").val(itemsList[id].name); // barCodes

    itemsList[id].barCodes.forEach(function(code, i, array) {
      $('<p class="barCode mb-2">' + code + ' <i class="fa fa-times codeRemove"></p>').appendTo("#barCodes");
      $(".codeRemove").click(function() {
        $(this).parent().remove();
      });
    });

    $("#price").val(itemsList[id].price);
    $("#costPrice").val(itemsList[id].costPrice);
    $("#tax").val(itemsList[id].tax);
    $("#measureName").val(itemsList[id].measureName);
    $("#description").val(itemsList[id].description);
    $("#alcoCheck").prop("checked", itemsList[id].alcoCheck); //
    $("#type").val(itemsList[id].type);

    itemsList[id].alcoCodes.forEach(function(code, i, array) {
      $('<p class="alcoCode mb-2">' + code + ' <i class="fa fa-times codeRemove"></p>').appendTo("#alcoCodes");
      $(".codeRemove").click(function() {
        $(this).parent().remove();
      });
    });

    $("#alcoholByVolume").val(itemsList[id].alcoholByVolume);
    $("#alcoholProductKindCode").val(itemsList[id].alcoholProductKindCode);
    $("#tareVolume").val(itemsList[id].tareVolume);
    $("#quantity").val(itemsList[id].quantity);
    $("#allowToSell").prop("checked", itemsList[id].allowToSell);

  };

  getStores(token, storesList, fillstoresTable, failFunc);

  // обработчик нажатия на магазин
  $('#storesContainer tbody tr').click(function(event) {
    $("#itemsContainer").css("visibility", "visible");
    $("#itemsContainer").css("opacity", "1");
    $(".table-active").removeClass("table-active");
    $(this).addClass("table-active");
    laststore = $(this).attr("id");
    getItems(storesList[laststore].uuid, token, itemsList, fillItemstable, failFunc);
  });

  $('#btnSave').click(function(event) {
    clearValidation();
    if (validateItem() === true) {
      var item = {
        uuid: itemsList[lastItem].uuid,
        code: $("#code").val(),
        barCodes: getBarCodes(),
        alcoCodes: getAlcoCodes(),
        name: $("#name").val(),
        price: $("#price").val(),
        quantity: $("#quantity").val(),
        costPrice: $("#costPrice").val(),
        measureName: $("#measureName").val(),
        tax: $("#tax").val(),
        allowToSell: $("#allowToSell").prop('checked'),
        description: $("#description").val(),
        articleNumber: $("#articleNumber").val(),
        parentUuid: null,
        group: false,
        type: $("#type").val(),
        alcoholByVolume: $("#alcoholByVolume").val(),
        alcoholProductKindCode: $("#alcoholProductKindCode").val(),
        tareVolume: $("#tareVolume").val(),
        fields: {}
      };

      console.log(JSON.stringify(item));
      var storeUuid = storesList[laststore].uuid;
      updateItem(storeUuid, token, item, successFunc, failFunc);
      clearForm();
      getItems(storesList[laststore].uuid, token, itemsList, fillItemstable, failFunc);
    }
  });



}
