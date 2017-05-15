window.onload = function() {
  var lastShop; // сохраняем выбранный магазин для доступа к его uuid в массиве товаров
  var lastItem; // сохраняем выбранный товар для доступа к его uuid в массиве товаров

  var shopsExampleList = [
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

  var itemsExampleList = [
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

  var fillShopsTable = function() {
    shopsExampleList.forEach(function(shop, i, array) {
      var tr = $("<tr/>").appendTo($("#shopsContainer tbody"));
      tr.attr("id", i);
      tr.append("<td>" + shop.name + "</td>");
      tr.append("<td>" + shop.address + "</td>");
    });
  };

  var fillItemsTalbe = function() {
    $("#itemsContainer tbody").empty();
    itemsExampleList.forEach(function(item, i, array) {
      var tr = $("<tr/>").appendTo($("#itemsContainer tbody"));
      tr.append("<td>" + item.code + "</td>");
      tr.append("<td>" + item.name + "</td>");
      tr.append("<td>" + item.description + "</td>");
      tr.append(
        "<td><button type='button' class='btn btn-primary btn-sm btnEdit' id='" + i + "'data-toggle='modal' data-target='#itemModal'>Изменить</button></td>"
      );
    });

    // обработчик кнопки "изменить"
    $('.btnEdit').click(function (event) {
      clearItemForm();
      fillItemForm($(this).attr("id"));
      lastItem = $(this).attr("id");
    });
  };

  var clearItemForm = function() {
    $("#code").val("");
    $("#articleNumber").val("");
    $("#barCode1").val("");
    $("#alcoCode1").val("");
    $(".barCodes").not("#barCode1").remove();
    $(".alcoCodes").not("#barCode1").remove();
    $("#description").val("");
    $("#quantity").val("");
  };

  var fillItemForm = function(id) {
    $("#name").val(itemsExampleList[id].name);
    $("#code").val(itemsExampleList[id].code);
    $("#articleNumber").val(itemsExampleList[id].articleNumber);

    $("#name").val(itemsExampleList[id].name);// barCodes

    itemsExampleList[id].barCodes.forEach(function(code, i, array) {
      if (i > 0) {
        $('<input type="text" class="form-control barCodes mt-2" placeholder="Значение штрихкода">').val(array[i]).insertBefore("#addBarCode");
      } else {
        $("#barCode1").val(itemsExampleList[id].barCodes[0]);
      }
    });


    $("#price").val(itemsExampleList[id].price);
    $("#costPrice").val(itemsExampleList[id].costPrice);
    $("#tax").val(itemsExampleList[id].tax);
    $("#measureName").val(itemsExampleList[id].measureName);
    $("#description").val(itemsExampleList[id].description);
    $("#alcoCheck").prop("checked", itemsExampleList[id].alcoCheck);//
    $("#type").val(itemsExampleList[id].type);

    $("#name").val(itemsExampleList[id].name); //alcoCodes

    $("#alcoholByVolume").val(itemsExampleList[id].alcoholByVolume);
    $("#alcoholProductKindCode").val(itemsExampleList[id].alcoholProductKindCode);
    $("#tareVolume").val(itemsExampleList[id].tareVolume);
    $("#quantity").val(itemsExampleList[id].quantity);
    $("#allowToSell").prop("checked", itemsExampleList[id].allowToSell);

  };

  fillShopsTable();

  // обработчик нажатия на магазин
  $('#shopsContainer tbody tr').click(function (event) {
    $("#itemsContainer").css("visibility", "visible");
    $("#itemsContainer").css("opacity", "1");
    $(".table-active").removeClass("table-active");
    $(this).addClass("table-active");
    fillItemsTalbe();
    lastShop = $(this).attr("id");
  });

  $('#btnSave').click(function (event) {
    clearControls();
    if (validateItem() === true) {
      var barCodesArray = $.map($('.barCodes'), function(code) {
        return code.value;
      });

      var alcoCodesArray = $.map($('.alcoCodes'), function(code) {
        return code.value;
      });

      var item = {
        uuid: itemsExampleList[lastItem].uuid,
        code: $("#code").val(),
        barCodes: barCodesArray,
        alcoCodes: alcoCodesArray,
        name: $("#name").val(),
        price: $("#price").val(),
        quantity: $("#quantity").val(),
        costPrice: $("#costPrice").val(),
        measureName: $("#measureName").val(),
        tax: $("#name").val(),
        allowToSell: $("#allowToSell").val(),
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

      console.log(item);
    }
  });



}
