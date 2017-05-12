window.onload = function() {
  // поля
  var name = document.getElementById("name"); // название
  var code = document.getElementById("code"); // код
  var articleNumber = document.getElementById("articleNumber"); // артикул
  var barCodes = document.getElementsByClassName("barCodes"); // алкокоды
  var price = document.getElementById("price"); // цена
  var costPrice = document.getElementById("costPrice"); // закупочная цена
  var tax = document.getElementById("name"); // ставка НДС
  var measureName = document.getElementById("measureName"); // единицы измерения
  var description = document.getElementById("description"); // описание
  var quantity = document.getElementById("quantity"); // остаток
  var allowToSell = document.getElementById("allowToSell"); // доступность продажи
  var shops = document.getElementById("shops"); // список магазинов

  // алкополя
  var alcoCheck = document.getElementById("alcoCheck"); // алкогалочка
  var type = document.getElementById("type"); // тип продукции
  var alcoCodes = document.getElementsByClassName("alcoCodes"); // алкокоды
  var alcoholByVolume = document.getElementById("alcoholByVolume"); // крепость алкоголя
  var alcoholProductKindCode = document.getElementById("alcoholProductKindCode"); // крепость алкоголя
  var tareVolume = document.getElementById("tareVolume"); // крепость алкоголя

  // кнопки
  var addBarCode = document.getElementById("addBarCode");
  var removeBarCode = document.getElementById("removeBarCode");

  var addAlcoCode = document.getElementById("addAlcoCode");
  var removeAlcoCode = document.getElementById("removeAlcoCode");

  var submit = document.getElementById("submit");


  // активация/деактивация алкополей
  var alcoOff = function() {
    type.value = "NORMAL";
    type.disabled = true;

    for (var i = 0; i < alcoCodes.length; i++) {
      alcoCodes[i].disabled = true;
      alcoCodes[i].value = "0";
    }

    alcoholByVolume.disabled = true;
    alcoholByVolume.value = "0";
    alcoholProductKindCode.disabled = true;
    alcoholProductKindCode.value = "0";
    tareVolume.disabled = true;
    tareVolume.value = "0";
    addAlcoCode.disabled = true;
    removeAlcoCode.disabled = true;
  }

  var alcoOn = function() {
    type.value = "ALCOHOL_MARKED";
    type.disabled = false;

    for (var i = 0; i < alcoCodes.length; i++) {
      alcoCodes[i].disabled = false;
      alcoCodes[i].value = "";
    }

    alcoholByVolume.disabled = false;
    alcoholByVolume.value = "";
    alcoholProductKindCode.disabled = false;
    alcoholProductKindCode.value = "";
    tareVolume.disabled = false;
    tareVolume.value = "";
    addAlcoCode.disabled = false;
    removeAlcoCode.disabled = false;
  }

  // изменение алкополей при установке алкогалочки
  alcoCheck.onclick = function() {
    if (this.checked) {
      alcoOn();
    } else {
      alcoOff();
    }
  }

  // добавление дополнительных полей для штрихкодов
  addBarCode.onclick = function() {
    $('<input type="text" class="form-control barCodes mt-2" placeholder="Значение штрихкода">').insertBefore("#addBarCode");
  }

  // удаление дополнительных полей для штрихкодов
  removeBarCode.onclick = function() {
    if ($("#addBarCode").prev().hasClass('barCodes') && $("#addBarCode").prev().prop("id") != "barCode1") {
      $("#addBarCode").prev().remove();
    }
  }

  // добавление дополнительных полей для алкокодов
  addAlcoCode.onclick = function() {
    $('<input type="text" class="form-control alcoCodes mt-2" placeholder="Значение алкокода">').insertBefore("#addAlcoCode");
  }

  // удаление дополнительных полей для алкокодов
  removeAlcoCode.onclick = function() {
    if ($("#addAlcoCode").prev().hasClass('alcoCodes') && $("#addAlcoCode").prev().prop("id") != "alcoCode1") {
      $("#addAlcoCode").prev().remove();
    }
  }

  // выдернуть список магазинов из выбора
  var getShopsList = function() {
    var shopsList = [];
    for (var i = 0; i < shops.options.length; i++) {
      if (shops.options[i].selected) {
        shopsList.push(shops.options[i].value);
      }
    }

    return shopsList;
  }

  // очистка классов перед валидацией
  var clearControls = function() {
    var parents = document.getElementsByClassName('has-danger');
    var fileds = document.getElementsByClassName('form-control-danger');
    var feedbacks = document.getElementsByClassName('form-control-feedback');
    while (parents.length > 0) {
      parents[0].classList.remove('has-danger');
    }
    while (fileds.length > 0) {
      fileds[0].classList.remove('form-control-danger');
    }
    while (feedbacks.length > 0) {
      feedbacks[0].remove();
    }
  }

  // валидация
  var validated; // флаг прохождения валидации
  var validate = function() {
    validated = true;

    if (name.value.length < 1 || name.value.length > 100) {
      validated = false;
      $("#name").parent().addClass("has-danger");
      $("#name").addClass("form-control-danger");
      $("#name").parent().append('<div class="form-control-feedback">Поле должно содержать от 1 до 100 символов</div>');
      console.log("name");
    }

    if (code.value.length > 10) {
      validated = false;
      $("#code").parent().addClass("has-danger");
      $("#code").addClass("form-control-danger");
      $("#code").parent().append('<div class="form-control-feedback">Поле должно содержать не более 10 символов</div>');
      console.log("code");
    }

    if (articleNumber.value.length > 20) {
      validated = false;
      $("#articleNumber").parent().addClass("has-danger");
      $("#articleNumber").addClass("form-control-danger");
      $("#articleNumber").parent().append('<div class="form-control-feedback">Поле должно содержать не более 20 символов</div>');
      console.log("articleNumber");
    }

    if (!price.value || price.value < 0 || price.value > 9999999.99 || (price.value.split('.')[1] || []).length > 2) {
      validated = false;
      $("#price").parent().addClass("has-danger");
      $("#price").addClass("form-control-danger");
      $("#price").parent().append('<div class="form-control-feedback">Значение поля должно лежать в диапазоне от 0 до 9999999.99; не более двух десятичных цифр</div>');
      console.log("price");
    }

    if (!costPrice.value || costPrice.value < 0 || costPrice.value > 9999999.99 || (costPrice.value.split('.')[1] || []).length > 2) {
      validated = false;
      $("#costPrice").parent().addClass("has-danger");
      $("#costPrice").addClass("form-control-danger");
      $("#costPrice").parent().append('<div class="form-control-feedback">Значение поля должно лежать в диапазоне от 0 до 9999999.99; не более двух десятичных цифр</div>');
      console.log("costPrice");
    }

    if ((quantity.value.split('.')[1] || []).length > 3) {
      validated = false;
      $("#quantity").parent().addClass("has-danger");
      $("#quantity").addClass("form-control-danger");
      $("#quantity").parent().append('<div class="form-control-feedback">Не более трёх десятичных цифр</div>');
      console.log("quantity");
    }

    if (getShopsList().length == 0) {
      validated = false;
      $("#shops").parent().addClass("has-danger");
      $("#shops").parent().append('<div class="form-control-feedback">Выберите хотя бы один магазин из списка</div>');
      console.log("shops");
    }

    // для алко
    if (alcoCheck.checked) {
      for (var i = 0; i < alcoCodes.length; i++) {
        if (alcoCodes[i].value.length == 0) {
          validated = false;
          $("#alcoCode1").parent().addClass("has-danger");
          $(".alcoCodes").addClass("form-control-danger");
          $("#alcoCode1").parent().append('<div class="form-control-feedback">Поле не может быть пустым</div>');
          console.log("alcoCodes");
        }
      }

      if (!alcoholByVolume.value || alcoholByVolume.value < 0 || alcoholByVolume.value > 99.999 || (alcoholByVolume.value.split('.')[1] || []).length > 3) {
        validated = false;
        $("#alcoholByVolume").parent().addClass("has-danger");
        $("#alcoholByVolume").addClass("form-control-danger");
        $("#alcoholByVolume").parent().append('<div class="form-control-feedback">Значение поля должно лежать в диапазоне от 0 до 99.999; не более трёх десятичных цифр</div>');
        console.log("alcoholByVolume");
      }

      if (!alcoholProductKindCode.value || alcoholProductKindCode.value < 0 || alcoholProductKindCode.value > 999) {
        validated = false;
        $("#alcoholProductKindCode").parent().addClass("has-danger");
        $("#alcoholProductKindCode").addClass("form-control-danger");
        $("#alcoholProductKindCode").parent().append('<div class="form-control-feedback">Значение поля должно лежать в диапазоне от 0 до 999</div>');
        console.log("alcoholProductKindCode");
      }

      if (!tareVolume.value || tareVolume.value < 0.001 || tareVolume.value > 999.999 || (tareVolume.value.split('.')[1] || []).length > 3) {
        validated = false;
        $("#tareVolume").parent().addClass("has-danger");
        $("#tareVolume").addClass("form-control-danger");
        $("#tareVolume").parent().append('<div class="form-control-feedback">Значение поля должно лежать в диапазоне от 0.001 до 999.999; не более трёх десятичных цифр</div>');
        console.log("tareVolume");
      }
    }

    return validated;
  }

  var getUUID = function() { // Public Domain/MIT
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
      d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }

  // обработка кнопки нажатия
  submit.onclick = function() {
    clearControls();

    if (validate() === true) {
      var barCodesArray = [];
      for (var i = 0; i < barCodes.length; i++) {
        barCodesArray.push(barCodes[i].value)
      }

      var alcoCodesArray = [];
      for (var i = 0; i < alcoCodes.length; i++) {
        alcoCodesArray.push(alcoCodes[i].value)
      }

      var item = {
        uuid: getUUID(),
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
      console.log(item);
    }

    return false;
  }

  // сброс алкополей
  alcoOff();
}
