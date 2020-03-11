'use strict';

(function () {

  var MAIN_PIN_POINTER_HEIGHT = 10;
  var MAIN_PIN_POINTER_WIDTH = 22;
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  // var ENTER_KEY = 'Enter';

  // Импорт данных из других модулей
  var addressInput = window.inactiveMode.addressInput;
  // var leftCoordinate = window.inactiveMode.leftCoordinate;
  // var topCoordinate = window.inactiveMode.topCoordinate;
  var mainPin = window.inactiveMode.mainPin;
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');

  var mainPinLeft = parseInt(mainPin.style.left, 10);
  var mainPinTop = parseInt(mainPin.style.top, 10);

  var isActivePage = false;

  //  меняю адрес исходя из полуенных цифр
  var changeAddressValue = function (left, top) {
    addressInput.value = left + ', ' + top;
  };

  // function changeСoordinates() {
  //   addressInput.setAttribute('value', String((leftCoordinate + Math.round(MAIN_PIN_POINTER_WIDTH / 2))) + ', ' + String((topCoordinate + Math.round(MAIN_PIN_POINTER_HEIGHT))));
  //   return addressInput.value;
  // }

  // получение и рендер данных с сервера
  // function getAndRenderData(dataFromServer) {
  //
  //   var allData = JSON.parse(dataFromServer);
  //
  //   allData.forEach(function (data) {
  //     window.serverRequest.posters.push(data);
  //   });
  //   var data = window.filter.filterByData(window.serverRequest.posters);
  //   // window.filter.filterByData(window.serverRequest.posters);
  //   window.pins.addPinsToDom(data);
  //   window.card.addCardToPin(data);
  // }

  // закрытие окна с ошибкой
  function closeError() {
    main.removeChild(document.querySelector('.error'));
  }

  // появление окна с ошибкой
  function showErrorMessage(msg) {

    var errorClone = errorTemplate.cloneNode(true);
    var fragment = document.createDocumentFragment();

    errorClone.querySelector('.error__message').innerHTML = msg;
    fragment.appendChild(errorClone);
    main.appendChild(fragment);
    // Закрытие окна с ошибкой
    window.addEventListener('click', closeError);
  }

  // вкл Активное состояние
  function changeOnActiveMode() {
    // если страницы не активна
    if (!isActivePage) {
      document.querySelector('.map').classList.remove('map--faded');
      document.querySelector('.ad-form').classList.remove('ad-form--disabled');
      window.inactiveMode.notDisabledAllFildset();
      mainPinLeft = Math.round(parseInt(mainPin.style.left, 10) + (MAIN_PIN_WIDTH / 2));
      mainPinTop = Math.round(parseInt(mainPin.style.top, 10) + MAIN_PIN_HEIGHT + MAIN_PIN_POINTER_HEIGHT);

      changeAddressValue(mainPinLeft, mainPinTop);

      window.serverRequest.onSuccesLoad('https://js.dump.academy/keksobooking/data', window.filter.filterByData, showErrorMessage);
      window.map.onActivePin();
      isActivePage = true;
      return;
    }
  }

  mainPin.addEventListener('mousedown', changeOnActiveMode);
  mainPin.addEventListener('keydown', function (evt) {
    if (evt.which === 1) {
      window.activeMode.changeOnActiveMode();
    }
  });


  // Экспорт функций модуля
  window.activeMode = {
    changeOnActiveMode: changeOnActiveMode,
    mainPin: mainPin,
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
    MAIN_PIN_POINTER_WIDTH: MAIN_PIN_POINTER_WIDTH,
    MAIN_PIN_POINTER_HEIGHT: MAIN_PIN_POINTER_HEIGHT,
    addressInput: addressInput,
    changeAddressValue: changeAddressValue
  };
})();
