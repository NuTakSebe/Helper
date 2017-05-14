window.onload = function() {

  // активация алкополей
  var alcoOff = function() {
    $("#type").val("NORMAL");
    $("#type").prop("disabled", true);

    $(".alcoCodes").each(function(i) {
      $(this).prop("disabled", true);
      $(this).val(0);
    });

    $("#alcoholByVolume").prop("disabled", true);
    $("#alcoholByVolume").val(0);
    $("#alcoholProductKindCode").prop("disabled", true);
    $("#alcoholProductKindCode").val(0);
    $("#tareVolume").prop("disabled", true);
    $("#tareVolume").val(0);
    $("#addAlcoCode").prop("disabled", true);
    $("#removeAlcoCode").prop("disabled", true);
  }

  // деактивация алкополей
  var alcoOn = function() {
    $("#type").val("ALCOHOL_MARKED");
    $("#type").prop("disabled", false);

    $(".alcoCodes").each(function(i) {
      $(this).prop("disabled", false);
      $(this).val("");
    });

    $("#alcoholByVolume").prop("disabled", false);
    $("#alcoholByVolume").val("");
    $("#alcoholProductKindCode").prop("disabled", false);
    $("#alcoholProductKindCode").val("");
    $("#tareVolume").prop("disabled", false);
    $("#tareVolume").val("");
    $("#addAlcoCode").prop("disabled", false);
    $("#removeAlcoCode").prop("disabled", false);
  }

  // включение/выключение алкополей при установке алкогалочки
  $("#alcoCheck").click(function() {
    if (this.checked) {
      alcoOn();
    } else {
      alcoOff();
    }
  });

  // добавление дополнительных полей для штрихкодов
  $("#addBarCode").click(function() {
    $('<input type="text" class="form-control barCodes mt-2" placeholder="Значение штрихкода">').insertBefore("#addBarCode");
  });

  // удаление дополнительных полей для штрихкодов
  $("#removeBarCode").click(function() {
    if ($("#addBarCode").prev().hasClass('barCodes') && $("#addBarCode").prev().prop("id") != "barCode1") {
      $("#addBarCode").prev().remove();
    }
  });

  // добавление дополнительных полей для алкокодов
  $("#addAlcoCode").click(function() {
    $('<input type="text" class="form-control alcoCodes mt-2" placeholder="Значение алкокода">').insertBefore("#addAlcoCode");
  });

  // удаление дополнительных полей для алкокодов
  $("#removeAlcoCode").click(function() {
    if ($("#addAlcoCode").prev().hasClass('alcoCodes') && $("#addAlcoCode").prev().prop("id") != "alcoCode1") {
      $("#addAlcoCode").prev().remove();
    }
  });

  // выдернуть список магазинов из выбора
  var getShopsList = function() {
    var shopsList = $.map($('#shops option:selected'), function(option) {
      return option.value;
    });

    return shopsList;
  }

  // убираем сообщения об ошибке перед валидацией
  var clearControls = function() {
    $(".has-danger").each(function() {
      $(this).removeClass("has-danger");
    });

    $(".form-control-danger").each(function() {
      $(this).removeClass("form-control-danger");
    });

    $(".form-control-feedback").each(function() {
      $(this).remove();
    });
  }

  var generateUUID = function() {
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
      d += performance.now();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }

  // обработка кнопки нажатия
  submit.onclick = function() {
    getShopsList();
    clearControls();
    console.log('submit started');

    if (validateItem() === true) {
      console.log('validate past');

      var barCodesArray = $.map($('.barCodes'), function(code) {
        return code.value;
      });

      var alcoCodesArray = $.map($('.alcoCodes'), function(code) {
        return code.value;
      });

      var item = {
        uuid: generateUUID(),
        code: code.value,
        barCodes: barCodesArray,
        alcoCodes: alcoCodesArray,
        name: name.value,
        price: price.value,
        quantity: quantity.value,
        costPrice: costPrice.value,
        measureName: measureName.value,
        tax: tax.value,
        allowToSell: allowToSell.checked,
        description: description.value,
        articleNumber: articleNumber.value,
        parentUuid: null,
        group: false,
        type: type.value,
        alcoholByVolume: alcoholByVolume.value,
        alcoholProductKindCode: alcoholProductKindCode.value,
        tareVolume: tareVolume.value,
        fields: {}
      }

      console.log(JSON.stringify(item));

      var storeUuid = "expampleStore";
      var token = "expampleToken";

      postItemsToStore(storeUuid, token, item);
    }

    return false;
  }

  // отключение алкополей
  alcoOff();
}
