window.onload = function() {
  // TODO: запрос на получение списка магазинов
  var shopsList = [{
    "uuid": "string",
    "name": "Name",
    "address": "string"
  }, {
    "uuid": "string12323",
    "name": "Name2",
    "address": "strin2g"
  }];

  shopsList.forEach(function(item, i, array) {
    $("#shops").append("<option value='" + item.uuid + "'>" + item.name + "</option>");
    console.log(item.uuid);
  });

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
  };

  // обработка кнопки нажатия
  submit.onclick = function() {
    clearControls();
    console.log('submit started');

    if (validateItem() === true) {
      console.log('validate past');

      var item = {
        uuid: generateUUID(),
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

      let token = getToken();
      let storeUuid = "expampleStore";
      console.log(token);
      console.log(JSON.stringify(item));

      var storeUuid = $("#shops").val();
      postItem(storeUuid, token, item);
      alert("Запросы выполнены");
    }

    return false;
  };

  // отключение алкополей
  alcoOff();
};
