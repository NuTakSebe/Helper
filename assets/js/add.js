window.onload = function() {
  var submit = document.getElementById("submit"); // кнопка Добавить товар

  var alcoCheck = document.getElementById("alcoCheck"); // алкогалочка
  var type = document.getElementById("type"); // тип продукции
  var alcoCodes = document.getElementsByClassName("alcoCodes"); // алкокоды
  var alcoholByVolume = document.getElementById("alcoholByVolume"); // крепость алкоголя
  var alcoholProductKindCode = document.getElementById("alcoholProductKindCode"); // крепость алкоголя
  var tareVolume = document.getElementById("tareVolume"); // крепость алкоголя

  // активация/деактивация алкополей
  var alcoOff = function() {
    type.value="NORMAL";
    type.disabled = true;

    for (var i = 0; i < alcoCodes.length; i++) {
      alcoCodes[i].disabled = true;
      alcoCodes[i].value = "0";
    }

    alcoholByVolume.disabled= true;
    alcoholByVolume.value = "0";
    alcoholProductKindCode.disabled= true;
    alcoholProductKindCode.value = "0";
    tareVolume.disabled= true;
    tareVolume.value = "0";
  }

  var alcoOn = function() {
    type.value = "ALCOHOL_MARKED";
    type.disabled = false;

    for (var i = 0; i < alcoCodes.length; i++) {
      alcoCodes[i].disabled = false;
      alcoCodes[i].value = "";
    }

    alcoholByVolume.disabled= false;
    alcoholByVolume.value = "";
    alcoholProductKindCode.disabled= false;
    alcoholProductKindCode.value = "";
    tareVolume.disabled= false;
    tareVolume.value = "";
  }

  // изменение алкополей при установке алкогалочки
  alcoCheck.onclick = function() {
    if (this.checked) {
      alcoOn();
    } else {
      alcoOff();
    }
  }

  // обработка кнопки нажатия
  submit.onclick = function() {
    //console.log(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test('12345678-1234-5678-1234-567812345678'));

  }

  // сброс алкополей
  alcoOff();
}
