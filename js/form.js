'use strict';
(function () {
  var selectRoom = document.querySelector('#room_number');
  var selectGuestsAll = document.querySelector('#capacity');
  var selectGuests = document.querySelectorAll('#capacity option');

  var selectType = document.querySelector('#type');
  var selectPrice = document.querySelector('#price');

  var selectTime = document.querySelector('.ad-form__element--time').querySelectorAll('select');

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

  selectRoom.addEventListener('change', onSelectRoom);
  selectType.addEventListener('change', onSelectType);
  selectTime.forEach(function (time) {
    time.addEventListener('change', onSelectTime);
  });
})();
