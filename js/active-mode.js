'use strict';

(function () {

  var MAIN_PIN_POINTER_HEIGHT = 10;
  var MAIN_PIN_POINTER_WIDTH = 22;
  // var ENTER_KEY = 'Enter';

  // Импорт данных из других модулей
  var addressInput = window.inactiveMode.addressInput;
  // var leftCoordinate = window.inactiveMode.leftCoordinate;
  // var topCoordinate = window.inactiveMode.topCoordinate;
  var mainPin = window.inactiveMode.mainPin;
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');

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
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    window.inactiveMode.notDisabledAllFildset();
    // changeСoordinates();
    // window.serverRequest.onSuccesLoad('https://js.dump.academy/keksobooking/data', window.filter.filterByData, showErrorMessage);
  }

  // // активация только при нажатии левой клавишей мыши
  // mainPin.addEventListener('mousedown', function (evt) {
  //
  //   evt.preventDefault();
  //
  //   var allPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  //   // при наличии уже имеющихся меток новые не отрисовываем
  //   if (evt.which === 1) {
  //     if (allPins.length !== 0) {
  //       return;
  //     } else {
  //       changeOnActiveMode();
  //     }
  //   }
  //
  //   var startCoords = {
  //     x: evt.clientX,
  //     y: evt.clientY
  //   };
  //
  //   var activeX = leftCoordinate + Math.round(MAIN_PIN_POINTER_WIDTH / 2);
  //   var activeY = topCoordinate + Math.round(MAIN_PIN_POINTER_HEIGHT);
  //
  //   addressInput.setAttribute('value', String(activeX) + ', ' + String(activeY));
  //
  //
  //   var dragged = false;
  //
  //   function onMouseMove(moveEvt) {
  //     moveEvt.preventDefault();
  //     dragged = true;
  //
  //     var map = document.querySelector('.map');
  //
  //     var shift = {
  //       x: startCoords.x - moveEvt.clientX,
  //       y: startCoords.y - moveEvt.clientY
  //     };
  //
  //     startCoords = {
  //       x: moveEvt.clientX,
  //       y: moveEvt.clientY
  //     };
  //
  //     mainPin.style.top = map.offsetTop - shift.y + 'px';
  //     mainPin.style.left = map.offsetLeft - shift.x + 'px';
  //
  //     addressInput.setAttribute('value', String(activeX - moveEvt.x) + ', ' + String(activeY - moveEvt.y));
  //   }
  //
  //   function onMouseUp(upEvt) {
  //     upEvt.preventDefault();
  //
  //     document.removeEventListener('mousemove', onMouseMove);
  //     document.removeEventListener('mouseup', onMouseUp);
  //
  //     if (dragged) {
  //       var onClickPreventDefault = function (clickEvt) {
  //         clickEvt.preventDefault();
  //         mainPin.removeEventListener('click', onClickPreventDefault);
  //       };
  //       mainPin.addEventListener('click', onClickPreventDefault);
  //     }
  //   }
  //
  //   document.addEventListener('mousemove', onMouseMove);
  //   document.addEventListener('mouseup', onMouseUp);
  // });

  // // активация только при нажатии Enter
  // mainPin.addEventListener('keydown', function (evt) {
  //
  //   var allPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  //
  //   if (evt.key === ENTER_KEY) {
  //     if (allPins.length !== 0) {
  //       return;
  //     } else {
  //       changeOnActiveMode();
  //     }
  //   }
  // });
  //
  // mainPin.addEventListener('mousedown', window.map.onActivePin);

  // активация только при нажатии левой клавишей мыши
  // mainPin.addEventListener('mousedown', function (evt) {
  //
  //   evt.preventDefault();
  //
  //   var allPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  //   // при наличии уже имеющихся меток новые не отрисовываем
  //   if (evt.which === 1) {
  //     if (allPins.length !== 0) {
  //       return;
  //     } else {
  //       // changeOnActiveMode();
  //     }
  //   }
  // });

  // Экспорт функций модуля
  window.activeMode = {
    changeOnActiveMode: changeOnActiveMode,
    mainPin: mainPin,
    MAIN_PIN_POINTER_WIDTH: MAIN_PIN_POINTER_WIDTH,
    MAIN_PIN_POINTER_HEIGHT: MAIN_PIN_POINTER_HEIGHT,
    addressInput: addressInput
  };
})();
