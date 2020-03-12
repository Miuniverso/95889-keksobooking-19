'use strict';
(function () {
  var selectRoom = document.querySelector('#room_number');
  var selectGuestsAll = document.querySelector('#capacity');
  var selectGuests = document.querySelectorAll('#capacity option');

  var selectType = document.querySelector('#type');
  var selectPrice = document.querySelector('#price');

  var selectTime = document.querySelector('.ad-form__element--time').querySelectorAll('select');
  var form = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var filter = document.querySelector('.map__filters');
  var addFormButton = document.querySelector('.ad-form__submit');
  var resetFormButton = document.querySelector('.ad-form__reset');

  var defaultCoords = {
    x: 570,
    y: 375
  };


  // выбор комнаты и блокировка неподходящих значений количества гостей
  function onSelectRoom(evt) {

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
  }

  function onSelectType(evt) {
    window.card.apartmentsList.forEach(function (apartment) {
      if (apartment.type === evt.target.value) {
        selectPrice.setAttribute('min', apartment.minPrice);
        selectPrice.setAttribute('placeholder', apartment.minPrice);
      }
    });
  }

  function onSelectTime(evt) {
    switch (evt.currentTarget.id) {
      case 'timein':
        selectTime[1].value = evt.target.value;
        break;
      case 'timeout':
        selectTime[0].value = evt.target.value;
        break;
    }
  }

  function onDisable(list, value) {
    list.forEach(function (item) {
      item.disabled = value;
    });
  }

  function changeCursor(list, cursor) {
    list.forEach(function (item) {
      item.style.cursor = cursor;
    });
  }

  function onResetForm() {
    form.reset();
    filter.reset();
    window.pins.deletePins();
    window.card.removeCard();
    window.inactiveMode.disabledAllFildset();
    window.map.mainPin.style.left = defaultCoords.x + 'px';
    window.map.mainPin.style.top = defaultCoords.y + 'px';
    form.classList.add('ad-form--disabled');
    filter.disabled = true;
    map.classList.add('map--faded');
    onDisable(document.querySelectorAll('.map__filter'), true);
    onDisable(document.querySelectorAll('.map__checkbox'), true);
    changeCursor(document.querySelectorAll('.map__filter'), 'default');
    changeCursor(document.querySelectorAll('.map__feature'), 'default');
    addFormButton.disabled = true;
    resetFormButton.disabled = true;
    window.activeMode.isActivePage = false;

    console.log(window.activeMode.isActivePage);

  }

  selectRoom.addEventListener('change', onSelectRoom);
  selectType.addEventListener('change', onSelectType);
  selectTime.forEach(function (time) {
    time.addEventListener('change', onSelectTime);
  });
  resetFormButton.addEventListener('click', onResetForm);
})();
