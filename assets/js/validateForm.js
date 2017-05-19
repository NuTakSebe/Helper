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
};
