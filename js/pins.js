'use strict';

(function () {
  var WIDTH_PIN = 50;
  var HEIGHT_PIN = 70;
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  // генерируем клон из шаблона
  function renderPin(pin) {
    var pinClone = pinTemplate.cloneNode(true);

    pinClone.style = 'left: ' + (pin.location.x - (WIDTH_PIN / 2)) + 'px; top: ' + (pin.location.y - HEIGHT_PIN) + 'px;';
    pinClone.querySelector('img').src = pin.author.avatar;
    pinClone.querySelector('img').alt = pin.offer.title;
    return pinClone;
  }

  var mapPinsWrapper = document.querySelector('.map__pins');
  // все метки на карте
  var fragment = document.createDocumentFragment();

  // добавляем объявление в разметку
  function addPinsToDom() {
    // !!! Я ПОЛУЧАЮ ВСЕ ДАННЫЕ, НО ОНИ НЕ ОТОБРАЖАЮТСЯ!!!
    console.log(window.serverRequest.posters);
    for (var i = 0; i < window.serverRequest.posters.length; i++) {
      fragment.appendChild(renderPin(window.serverRequest.posters[i]));
    }
    mapPinsWrapper.appendChild(fragment);
  }

  // Экспорт функций модуля
  window.pins = {
    addPinsToDom: addPinsToDom
  };
})();
