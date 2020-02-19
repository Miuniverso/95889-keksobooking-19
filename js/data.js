'use strict';

(function () {
  var TYPE_LIST = ['palace', 'flat', 'house', 'bungalo'];
  var CHECKIN_LIST = ['12:00', '13:00', '14:00'];
  var CHECKOUT_LIST = ['12:00', '13:00', '14:00'];
  var FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS_LIST = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var START_VALUE = 0;
  var MAX_VALUE_X = 1200;
  var MAX_VALUE_Y = 630;
  var MIN_VALUE_Y = 130;
  var MAX_TOTAL = 8;

  // массив объявлений
  var posters = [];

  // генерация случайного индекса
  function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // генерация рандомного массива
  function getRandomArray(arr) {
    return arr.slice(0, getRandomValue(1, arr.length - 1));
  }


  function generateNewAds() {

    for (var i = 0; i < MAX_TOTAL; i++) {

      var positionX = getRandomValue(START_VALUE, MAX_VALUE_X);
      var positionY = getRandomValue(MIN_VALUE_Y, MAX_VALUE_Y);

      posters.push({
        'author': {
          'avatar': 'img/avatars/user0' + (i + 1) + '.png'
        },
        'offer': {
          'title': 'Отличное местечко',
          'address': positionX.toString() + ', ' + positionY.toString(),
          'price': 5000,
          'type': TYPE_LIST[getRandomValue(START_VALUE, TYPE_LIST.length - 1)],
          'rooms': 2,
          'guests': 4,
          'checkin': CHECKIN_LIST[getRandomValue(START_VALUE, CHECKIN_LIST.length - 1)],
          'checkout': CHECKOUT_LIST[getRandomValue(START_VALUE, CHECKOUT_LIST.length - 1)],
          'features': getRandomArray(FEATURES_LIST),
          'description': 'Самое шикарное описание',
          'photos': getRandomArray(PHOTOS_LIST)
        },
        'location': {
          'x': positionX,
          'y': positionY
        }});
    }
  }

  generateNewAds();

  // Экспорт данных модуля
  window.data = {
    posters: posters
  };
})();
