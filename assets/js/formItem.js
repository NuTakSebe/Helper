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

// валидация
var validateItem = function() {
  var validated = true;
  if ($("#name").val().length < 1 || $("#name").val().length > 100) {
    validated = false;
    $("#name").parent().addClass("has-danger");
    $("#name").addClass("form-control-danger");
    $("#name").parent().append('<div class="form-control-feedback">Поле должно содержать от 1 до 100 символов</div>');
    console.log("name");
  }

  if ($("#code").val().length > 10) {
    validated = false;
    $("#code").parent().addClass("has-danger");
    $("#code").addClass("form-control-danger");
    $("#code").parent().append('<div class="form-control-feedback">Поле должно содержать не более 10 символов</div>');
    console.log("code");
  }

  if ($("#articleNumber").val().length > 20) {
    validated = false;
    $("#articleNumber").parent().addClass("has-danger");
    $("#articleNumber").addClass("form-control-danger");
    $("#articleNumber").parent().append('<div class="form-control-feedback">Поле должно содержать не более 20 символов</div>');
    console.log("articleNumber");
  }

  if (!($("#price").val()) || $("#price").val() < 0 || $("#price").val() > 9999999.99 || ($("#price").val().split('.')[1] || []).length > 2) {
    validated = false;
    $("#price").parent().addClass("has-danger");
    $("#price").addClass("form-control-danger");
    $("#price").parent().append('<div class="form-control-feedback">Значение поля должно лежать в диапазоне от 0 до 9999999.99; не более двух десятичных цифр</div>');
    console.log("price");
  }

  if (!($("#costPrice").val()) || $("#costPrice").val() < 0 || $("#costPrice").val() > 9999999.99 || ($("#costPrice").val().split('.')[1] || []).length > 2) {
    validated = false;
    $("#costPrice").parent().addClass("has-danger");
    $("#costPrice").addClass("form-control-danger");
    $("#costPrice").parent().append('<div class="form-control-feedback">Значение поля должно лежать в диапазоне от 0 до 9999999.99; не более двух десятичных цифр</div>');
    console.log("costPrice");
  }

  if (($("#quantity").val().split('.')[1] || []).length > 3) {
    validated = false;
    $("#quantity").parent().addClass("has-danger");
    $("#quantity").addClass("form-control-danger");
    $("#quantity").parent().append('<div class="form-control-feedback">Не более трёх десятичных цифр</div>');
    console.log("quantity");
  }

  // для алко
  if ($("#alcoCheck").prop("checked")) {
    $(".has-alcoCodes").each(function() {
      if ($(this).val().length == 0) {
        validated = false;
        $("#alcoCode1").parent().addClass("has-danger");
        $(".alcoCodes").addClass("form-control-danger");
        $("#alcoCode1").parent().append('<div class="form-control-feedback">Поле не может быть пустым</div>');
        console.log("alcoCodes");
      }
    });

    if (!($("#alcoholByVolume").val()) || $("#alcoholByVolume").val() < 0 || $("#alcoholByVolume").val() > 99.999 || ($("#alcoholByVolume").val().split('.')[1] || []).length > 3) {
      validated = false;
      $("#alcoholByVolume").parent().addClass("has-danger");
      $("#alcoholByVolume").addClass("form-control-danger");
      $("#alcoholByVolume").parent().append('<div class="form-control-feedback">Значение поля должно лежать в диапазоне от 0 до 99.999; не более трёх десятичных цифр</div>');
      console.log("alcoholByVolume");
    }

    if (!($("#alcoholProductKindCode").val()) || $("#alcoholProductKindCode").val() < 0 || $("#alcoholProductKindCode").val() > 999) {
      validated = false;
      $("#alcoholProductKindCode").parent().addClass("has-danger");
      $("#alcoholProductKindCode").addClass("form-control-danger");
      $("#alcoholProductKindCode").parent().append('<div class="form-control-feedback">Значение поля должно лежать в диапазоне от 0 до 999</div>');
      console.log("alcoholProductKindCode");
    }

    if (!($("#tareVolume").val()) || $("#tareVolume").val() < 0.001 || $("#tareVolume").val() > 999.999 || ($("#tareVolume").val().split('.')[1] || []).length > 3) {
      validated = false;
      $("#tareVolume").parent().addClass("has-danger");
      $("#tareVolume").addClass("form-control-danger");
      $("#tareVolume").parent().append('<div class="form-control-feedback">Значение поля должно лежать в диапазоне от 0.001 до 999.999; не более трёх десятичных цифр</div>');
      console.log("tareVolume");
    }
  }

  return validated;
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
