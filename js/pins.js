'use strict';

(function () {
  var WIDTH_PIN = 50;
  var HEIGHT_PIN = 70;

  var posters = window.data.posters;

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  // генерируем клон из шаблона
  function renderPin(pin) {
    var pinClone = pinTemplate.cloneNode(true);

    pinClone.style = 'left: ' + (pin.location.x - (WIDTH_PIN / 2)) + 'px; top: ' + (pin.location.y - HEIGHT_PIN) + 'px;';
    pinClone.querySelector('img').src = pin.author.avatar;
    pinClone.querySelector('img').alt = pin.offer.title;
    return pinClone;
  }

  var mapPins = document.querySelector('.map__pins');

  var fragment = document.createDocumentFragment();

  // добавляем объявление в разметку
  function addPinsToDOM() {
    for (var i = 0; i < posters.length; i++) {
      fragment.appendChild(renderPin(posters[i]));
    }
    mapPins.appendChild(fragment);
  }

  // Экспорт функций модуля
  window.data = {
    addPinsToDOM: addPinsToDOM
  };
})();
