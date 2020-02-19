'use strict';
(function () {
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

})();
