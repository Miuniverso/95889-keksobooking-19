
// Кексобукинг
// data.js — модуль, который создаёт данные;
// map.js — модуль, который управляет карточками объявлений и метками: добавляет на страницу нужную карточку, отрисовывает метки и осуществляет взаимодействие карточки и метки на карте;
// card.js — модуль, который отвечает за создание карточки объявлений;
// pin.js — модуль, который отвечает за создание метки на карте;
// form.js — модуль, который работает с формой объявления.

'use strict';
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
var WIDTH_PIN = 50;
var HEIGHT_PIN = 70;
var ENTER_KEY = 'Enter';
var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 65;
var MAIN_PIN_POINTER_HEIGHT = 10;
var MAIN_PIN_POINTER_WIDTH = 22;

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

// 1.1.3 ТЗ
var selectElements = document.querySelectorAll('.ad-form fieldset');

function disabledAllFildset() {
  for (var i = 0; i < selectElements.length - 1; i++) {
    selectElements[i].setAttribute('disabled', 'disabled');
  }
}

disabledAllFildset();

function notDisabledAllFildset() {
  for (var i = 0; i < selectElements.length - 1; i++) {
    selectElements[i].removeAttribute('disabled');
  }
}

var mainPin = document.querySelector('.map__pin--main');
var addressInput = document.querySelector('#address');

// получение координат и приведение их к числовому формату для последующих изменений
var leftCoordinate = Number((mainPin.style.left).match(/\d*/));
var topCoordinate = Number((mainPin.style.top).match(/\d*/));

// задание базового положения при неактивном состоянии
addressInput.setAttribute('value', String((leftCoordinate + Math.round(MAIN_PIN_WIDTH / 2))) + ', ' + String((topCoordinate + Math.round(MAIN_PIN_HEIGHT / 2))));

// изменение координаты при активном состоянии
function changeСoordinates() {
  addressInput.setAttribute('value', String((leftCoordinate + Math.round(MAIN_PIN_POINTER_WIDTH / 2))) + ', ' + String((topCoordinate + Math.round(MAIN_PIN_POINTER_HEIGHT))));
}

// вкл Активное состояние
function changeOnActiveMode() {
  document.querySelector('.map').classList.remove('map--faded');
  document.querySelector('.ad-form').classList.remove('ad-form--disabled');
  notDisabledAllFildset();
  changeСoordinates();
  addPinsToDOM();
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

var selectRoom = document.querySelector('#room_number');
var selectGuestsAll = document.querySelector('#capacity');
var selectGuests = document.querySelectorAll('#capacity option');

// выбор комнаты и блокировка неподходящих значений количества гостей
var onSelectRoom = function (evt) {

  var count = evt.target.value;

  selectGuests.forEach(function (option) {
    option.remove();
    if (option.value !== '0' && Number(option.value) <= Number(count)) {
      selectGuestsAll.appendChild(option);
    }

    if (count === '100') {
      selectGuests.forEach(function (element) {
        element.remove();
      });
      selectGuestsAll.appendChild(option);
    }
  });
};

selectRoom.addEventListener('change', onSelectRoom);
