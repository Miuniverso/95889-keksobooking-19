'use strict';

// генерация случайного индекса
function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// генерация рандомного массива
function getRandomArr(arr) {
  var newArr = [];
  var newLength = getRandomInRange(1, arr.length - 1);
  for (var i = 0; i <= newLength; i++) {
    // пока не придумала, как сделать рандомную выборку фичей
    // newArr.push(arr[getRandomInRange(0, arr.length - 1)])
    newArr.push(arr[i]);
  }
  return newArr;
}
// массив объявлений
var ads = [];

var typeList = ['palace', 'flat', 'house', 'bungalo'];
var checkinList = ['12:00', '13:00', '14:00'];
var checkoutList = ['12:00', '13:00', '14:00'];
var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photosList = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];


function generateNewAds() {

  for (var i = 0; i < 8; i++) {

    var positionX = getRandomInRange(0, 1200);
    var positionY = getRandomInRange(130, 630);

    ads.push({
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      'offer': {
        'title' : 'Отличное местечко',
        'address': positionX.toString() + ', ' + positionY.toString(),
        'price': 5000,
        'type': typeList[getRandomInRange(0, typeList.length - 1)],
        'rooms': 2,
        'guests': 4,
        'checkin': checkinList[getRandomInRange(0, checkinList.length - 1)],
        'checkout': checkoutList[getRandomInRange(0, checkoutList.length - 1)],
        'features': getRandomArr(featuresList),
        'description': 'Самое шикарное описание',
        'photos': getRandomArr(photosList)
      },
    'location': {
      'x': positionX,
      'y': positionY
    }})
  }
  console.log(ads)
}

generateNewAds();

document.querySelector('.map').classList.remove('map--faded');

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

// генерируем клон из шаблона
function renderPin(pin) {
  var PinClone = pinTemplate.cloneNode(true);

  PinClone.style = 'left: ' + (pin.location.x + 40) + 'px; top: ' + (pin.location.y + 40) + 'px;';
  PinClone.querySelector('img').src = pin.author.avatar;
  PinClone.querySelector('img').alt = pin.offer.title;
  return PinClone;
}

var mapPins = document.querySelector('.map__pins');

var fragment = document.createDocumentFragment();

// добавляем объявление в разметку
function addPinsToDOM() {
  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(renderPin(ads[i]));
  }
  mapPins.appendChild(fragment);
}

addPinsToDOM();
