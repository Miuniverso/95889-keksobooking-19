'use strict';

(function () {

  var cardTemplate = document.querySelector('#card').content.querySelector('.popup');

  var typesOfHouse = [
    {
      type: 'flat',
      translate: 'Квартира',
    },
    {
      type: 'bungalo',
      translate: 'Бунгало',
    },
    {
      type: 'house',
      translate: 'Дом',
    },
    {
      type: 'palace',
      translate: 'Дворец',
    }
  ];

  // поиск нужного типа аппартаментов
  function findTypeOfHouse(type) {
    var translate;

    typesOfHouse.forEach(function (element) {

      if (element.type === type) {
        translate = element.translate;
      }
    });
    return translate;
  }

  // создание списка фич
  function createFeatures(array) {
    var newFragment = document.createDocumentFragment();

    for (var i = 0; i < array.length; i++) {
      var featureElement = document.createElement('li');
      featureElement.classList.add('popup__feature popup__feature--' + array[i]);
      newFragment.appendChild(featureElement);
    }
    return newFragment;
  }

  // список фотографийн
  function createPhotos(array) {
    var newFragment = document.createDocumentFragment();

    for (var i = 0; i < array.length; i++) {
      var featureElement = document.createElement('li');
      featureElement.classList.add('popup__photo');
      featureElement.src = array[i];
      newFragment.appendChild(featureElement);
    }
    return newFragment;
  }

  // создание карточки
  var renderCard = function (poster) {
    var cardClone = cardTemplate.cloneNode(true);
    var cardFeatures = cardTemplate.querySelector('.popup__features');
    var cardPhotos = cardTemplate.querySelector('.popup__photos');
    cardClone.querySelector('popup__avatar').src = poster.author.avatar;
    cardClone.querySelector('.popup__title').textContent = poster.offer.title;
    cardClone.querySelector('.popup__text--address').textContent = poster.offer.address;
    cardClone.querySelector('.popup__text--price').textContent = poster.offer.price + '₽/ночь';
    cardClone.querySelector('.popup__type').textContent = findTypeOfHouse(poster.offer.type);
    cardClone.querySelector('.popup__text--capacity').textContent = poster.offer.rooms + ' комнаты для ' + poster.offer.guests + ' гостей';
    cardClone.querySelector('.popup__text--time ').textContent = 'Заезд после ' + poster.offer.checkin + ', выезд до ' + poster.offer.checkout;
    cardFeatures.innerHTML = '';
    cardFeatures.appendChild(createFeatures(poster.offer.features));
    cardPhotos.innerHTML = '';
    cardPhotos.appendChild(createPhotos(poster.offer.photos));
    cardClone.querySelector('.popup__description').textContent = poster.offer.description;
    return cardClone;
  };

  var addCardToPin = function () {
    var allPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    var cardToPin = document.createDocumentFragment();
    // проверка
    console.log('All card ', allPins);

    window.data.posters.forEach(function (pin, index) {
      allPins[index].addEventListener('click', function () {
        cardToPin.appendChild(renderCard(pin));
      });
    });
  };

  // Экспорт функций модуля
  window.pins = {
    renderCard: renderCard,
    addCardToPin: addCardToPin
  };
})();
