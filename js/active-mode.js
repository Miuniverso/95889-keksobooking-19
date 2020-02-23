'use strict';

(function () {

  var MAIN_PIN_POINTER_HEIGHT = 10;
  var MAIN_PIN_POINTER_WIDTH = 22;
  var ENTER_KEY = 'Enter';

  // Импорт данных из других модулей
  var addressInput = window.inactiveMode.addressInput;
  var leftCoordinate = window.inactiveMode.leftCoordinate;
  var topCoordinate = window.inactiveMode.topCoordinate;
  var mainPin = window.inactiveMode.mainPin;

  function changeСoordinates() {
    addressInput.setAttribute('value', String((leftCoordinate + Math.round(MAIN_PIN_POINTER_WIDTH / 2))) + ', ' + String((topCoordinate + Math.round(MAIN_PIN_POINTER_HEIGHT))));
  }

  // вкл Активное состояние
  function changeOnActiveMode() {
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    window.inactiveMode.notDisabledAllFildset();
    changeСoordinates();
    window.serverRequest.parseOfData();
    window.pins.addPinsToDom();
    window.card.addCardToPin();
    // window.serverRequest.parseOfData();
  }

  // активация только при нажатии левой клавишей мыши
  mainPin.addEventListener('mousedown', function (evt) {
    if (evt.which === 1) {
      changeOnActiveMode();
    }
  });

  // активация только при нажатии Enter
  mainPin.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      changeOnActiveMode();
    }
  });
  // Экспорт функций модуля
  window.activeMode = {
    changeOnActiveMode: changeOnActiveMode
  };
})();
