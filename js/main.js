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
    // console.log(selectElements[i]);
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
  if (!evt.button === 0) {
    // не работает проверка
    return;
  } else {
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
var selectGuests = document.querySelectorAll('#capacity option');

// выбор комнаты и блокировка неподходящих значений количества гостей
var onCheckGuest = function (count) {

  for (var i = 0; i <= selectGuests.length - 1; i++) {
    selectGuests[i].removeAttribute('disabled');

    if (Number(selectGuests[i].value) > Number(count) || selectGuests[i].value === '0') {
      selectGuests[i].setAttribute('disabled', 'disabled');
    }

    // не работает
    if (count === '100') {
      if (selectGuests[i].value !== '0') {
        selectGuests[i].setAttribute('disabled', 'disabled');
      }
    }
  }
};

// деактивирую соответствующие элементы количества гостей
var onLimitTheGuests = function (evt) {
  var forGuests = evt.target.value;

  switch (forGuests) {
    case '1':
      onCheckGuest(forGuests);
      break;
    case '2':
      onCheckGuest(forGuests);
      break;
    case '3':
      onCheckGuest(forGuests);
      break;
    case '100':
      onCheckGuest(forGuests);
      break;
  }
};

selectRoom.addEventListener('change', onLimitTheGuests);

// Поле «Количество комнат» синхронизировано с полем «Количество мест» таким образом, что при выборе
// количества комнат вводятся ограничения на допустимые варианты выбора количества гостей:
//
// 1 комната — «для 1 гостя»;
// 2 комнаты — «для 2 гостей» или «для 1 гостя»;
// 3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»;
// 100 комнат — «не для гостей».

// В этом задании мы запрограммируем сценарий установки соответствия количества гостей (спальных мест) с количеством
// комнат.
// Напомним, сценарий проверки нестандартный и решить задачу с помощью одних атрибутов не получится.
// Есть несколько путей к решению (об это чуть ниже), но пока договоримся: при необходимости
// вы можете доработать разметку формы.

// Разберём несколько подходов к решению. Первый заключается в физическом ограничении возможности выбора неправильных
// вариантов. Для этого вы можете или удалять соответствующие элементы option из разметки
// или добавлять им атрибут disabled. Этот вариант относительно прост в реализации.
// Правда у него есть один существенный недостаток ‐ при таком подходе возникает проблема в сценарии взаимодействия,
// когда у пользователя уже выбран вариант, который вы хотите исключить.
// Произойдёт неявное изменение значения, которое пользователь скорей всего не заметит.
//
// Второй подход заключается в использовании встроенного API для валидации.
// Вы пишите код проверки соответствия и если выбранное количество гостей не подходит под количество комнат,
// вызываете метод setCustomValidity.
