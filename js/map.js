'use strict';

(function () {

  var MapCoordinate = {
    width: document.querySelector('.map').clientWidth,
    height: document.querySelector('.map').clientHeight
  };

  var MainPinCoordinate = {
    width: document.querySelector('.map__pin--main').clientWidth,
    height: document.querySelector('.map__pin--main').clientHeight,
    // длина и высота кончика метки
    tipWidth: 22,
    tipHeight: 10
  };

  var YCoordinate = {
    min: 130,
    max: 630
  };

  var ENTER_KEY = 'Enter';

  // var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var addressInput = window.inactiveMode.addressInput;

  // получение координат и приведение их к числовому формату для последующих изменений
  var leftCoordinate = Number((mainPin.style.left).match(/\d*/));
  var topCoordinate = Number((mainPin.style.top).match(/\d*/));

  var startCoords = {};


  // функция активации и перемещения главной метки
  function onActivePin() {

    // нажатие левой клавишей мыши
    mainPin.addEventListener('mousedown', function (evt) {
      console.log('Нажатие');

      evt.preventDefault();

      var allPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      // при наличии уже имеющихся меток новые не отрисовываем
      if (evt.which === 1) {
        if (allPins.length !== 0) {
          console.log('уже есть метки');
          onMouseMove(evt);
          return;
        } else {
          window.activeMode.changeOnActiveMode();
        }
      }

      startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      addressInput.setAttribute('value', Math.round(leftCoordinate + MainPinCoordinate.width / 2) + ', ' + Math.round(topCoordinate + MainPinCoordinate.height / 2));

      // перемещаем метку с помощью мыши
      function onMouseMove(moveEvt) {
        console.log('Движение');
        moveEvt.preventDefault();

        // измененные координаты
        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };
        // перезапись изначальных координат
        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        // для проверки
        console.log(startCoords.x + ' ' + startCoords.y);

        var changedPinTop = mainPin.offsetTop - shift.y;
        var changedPinLeft = mainPin.offsetLeft - shift.x;

        mainPin.style.top = changedPinTop + 'px';
        mainPin.style.left = changedPinLeft + 'px';

        if (changedPinLeft < 0) {
          changedPinLeft = 0;
          mainPin.style.left = '0px';
        } else if (changedPinLeft > MapCoordinate.width - MainPinCoordinate.width) {
          mainPin.style.left = MapCoordinate.width - MainPinCoordinate.width + 'px';
          changedPinLeft = MapCoordinate.width - MainPinCoordinate.width;
        }

        if (changedPinTop < YCoordinate.min) {
          mainPin.style.top = YCoordinate.min + 'px';
          changedPinTop = YCoordinate.min;
        } else if (changedPinTop > YCoordinate.max) {
          mainPin.style.top = YCoordinate.max + 'px';
          changedPinTop = YCoordinate.max;
        }

        addressInput.setAttribute('value', String(Math.round(changedPinLeft + (MainPinCoordinate.width / 2))) + ', ' + String(changedPinTop + MainPinCoordinate.height + MainPinCoordinate.tipHeight));
      }

      // поднятие клавиши мыши
      function onMouseUp(upEvt) {

        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      }


      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });


    // активация только при нажатии Enter
    mainPin.addEventListener('keydown', function (evt) {

      var allPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

      if (evt.key === ENTER_KEY) {
        if (allPins.length !== 0) {
          return;
        } else {
          window.activeMode.changeOnActiveMode();
        }
      }
    });

  }

  onActivePin();

  // Экспорт данных из модуля
  window.map = {
    onActivePin: onActivePin
  };
})();
