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

  var XCoordinate = {
    min: -(window.activeMode.MAIN_PIN_WIDTH / 2),
    max: MapCoordinate.width + (window.activeMode.MAIN_PIN_WIDTH / 2)
  };

  var mainPin = window.inactiveMode.mainPin;

  function onActivePin() {
    // нажатие кнопки мыши
    mainPin.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      var target = evt.currentTarget;

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };
      // перемещения еще нет
      var dragged = false;

      // функция перемещения
      function onMouseMove(moveEvt) {
        moveEvt.preventDefault();
        // перемещение сработало
        dragged = true;

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        // переписываю изначальные кординаты при переемещени
        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        mainPin.style.top = mainPin.offsetTop - shift.y + 'px';
        mainPin.style.left = mainPin.offsetLeft - shift.x + 'px';

        if (parseInt(target.style.left, 10) < XCoordinate.min) {
          target.style.left = XCoordinate.min + 'px';
          mainPin.style.left = XCoordinate.min;
        } else if (parseInt(target.style.left, 10) > XCoordinate.max) {
          target.style.left = XCoordinate.max + 'px';
          mainPin.style.left = XCoordinate.max;
        }

        if (parseInt(target.style.top, 10) < YCoordinate.min) {
          target.style.top = YCoordinate.min + 'px';
          mainPin.style.top = YCoordinate.min;
        } else if (parseInt(target.style.top, 10) > YCoordinate.max) {
          target.style.top = YCoordinate.max + 'px';
          mainPin.style.top = YCoordinate.max;
        }

        window.activeMode.changeAddressValue(Math.round(parseInt(target.style.left, 10) + (MainPinCoordinate.width / 2)), parseInt(target.style.top, 10) + MainPinCoordinate.height + MainPinCoordinate.tipHeight);
      }

      function onMouseUp(mouseUpEvt) {
        mouseUpEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        if (dragged) {
          var onClickPreventDefault = function (dragEvt) {
            dragEvt.preventDefault();
            mainPin.removeEventListener('click', onClickPreventDefault);
          };
          mainPin.addEventListener('click', onClickPreventDefault);
        }

      }

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  }

  // Экспорт данных из модуля
  window.map = {
    onActivePin: onActivePin,
    MainPinCoordinate: MainPinCoordinate,
  };
})();
