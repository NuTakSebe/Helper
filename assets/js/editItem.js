window.onload = function() {
  var lastShop; // сохраняем выбранный магазин для доступа к его uuid в массиве товаров
  var lastItem; // сохраняем выбранный товар для доступа к его uuid в массиве товаров

  var shopsList = [];

  var itemsList = [];

  var fillShopsTable = function() {
    // TODO: запрос на получение списка магазинов
    shopsList = [
      {
        "uuid": "string",
        "name": "Name",
        "address": "string"
      },{
        "uuid": "string",
        "name": "Name2",
        "address": "strin2g"
      }
    ];

    shopsList.forEach(function(shop, i, array) {
      var tr = $("<tr/>").appendTo($("#shopsContainer tbody"));
      tr.attr("id", i);
      tr.append("<td>" + shop.name + "</td>");
      tr.append("<td>" + shop.address + "</td>");
    });
  };

  var fillItemsTalbe = function(storeUuid) {
    // TODO: запрос на получение списка товаров
    itemsList = [
      {
        "uuid": "string",
        "code": "string",
        "barCodes": [123, 64564],
        "alcoCodes": [],
        "name": "string",
        "price": 0,
        "quantity": 0,
        "costPrice": 0,
        "measureName": "шт",
        "tax": "VAT_0",
        "allowToSell": true,
        "description": "string",
        "articleNumber": "string",
        "parentUuid": "string",
        "group": false,
        "type": "NORMAL",
        "alcoholByVolume": 0,
        "alcoholProductKindCode": 0,
        "tareVolume": 0
      }, {
        "uuid": "strin2g",
        "code": "strin2g",
        "barCodes": [],
        "alcoCodes": [],
        "name": "str123ing",
        "price": 0,
        "quantity": 0,
        "costPrice": 0,
        "measureName": "",
        "tax": "NO_VAT",
        "allowToSell": true,
        "description": "string",
        "articleNumber": "string",
        "parentUuid": "string",
        "group": true,
        "type": "NORMAL",
        "alcoholByVolume": 0,
        "alcoholProductKindCode": 0,
        "tareVolume": 0
      }
    ];

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
    $('.btnEdit').click(function (event) {
      clearItemForm();
      fillItemForm($(this).attr("id"));
      lastItem = $(this).attr("id");
    });

    // обработчик кнопки "удалить"
    $('.btnDelete').click(function (event) {
      console.log($(this).attr("id"))
    });
  };

  var clearItemForm = function() {
    $("#name").val("");
    $("#code").val("");
    $("#articleNumber").val("");
    $("#barCode1").val("");
    $("#alcoCode1").val("");
    $(".barCode").remove();
    $(".alcoCode").remove();
    $("#alcoCode1").val("");
    $("#alcoholByVolume").val(0);
    $("#alcoholProductKindCode").val(0);
    $("#type").val("NORMAL");
    $("#price").val(0);
    $("#costPrice").val(0);
    $("#quantity").val(0);
    $("#tareVolume").val(0);
    $("#description").val("");
    $("#quantity").val("");
    $("#measureName").val("шт");
    $("#tax").val("VAT_0");
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

    $("#name").val(itemsList[id].name);// barCodes

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
    $("#alcoCheck").prop("checked", itemsList[id].alcoCheck);//
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

  fillShopsTable();

  // обработчик нажатия на магазин
  $('#shopsContainer tbody tr').click(function (event) {
    $("#itemsContainer").css("visibility", "visible");
    $("#itemsContainer").css("opacity", "1");
    $(".table-active").removeClass("table-active");
    $(this).addClass("table-active");
    lastShop = $(this).attr("id");
    fillItemsTalbe(shopsList[lastShop].uuid);
  });

  $('#btnSave').click(function (event) {
    clearControls();
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

      var storeUuid = shopsList[lastShop].uuid;
      var itemUuid = itemsList[lastItem].uuid;

      updateItem(storeUuid, token, item);
      clearItemForm();
      fillItemsTalbe(shopsList[lastShop].uuid);
      alert("Запросы выполнены");
    }
  });



};
