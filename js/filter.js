'use strict';

(function () {
  var allFilters = document.querySelector('.map__filters');

  var filterPosters = [];

  var Price = {
    min: 10000,
    max: 50000
  };

  var rangePrice = {
    low: function (price) {
      return price < Price.min;
    },
    middle: function (price) {
      return price <= Price.max && price >= Price.min;
    },
    high: function (price) {
      return price > Price.max;
    }
  };

  // фильтрация объявлений по выбранному значению в фильтре
  function filterByValue(dataList, filter, checkValue) {
    return dataList.filter(function (data) {
      return data.offer[filter].toString() === checkValue;
    });
  }

  function filterByPrice(dataList, checkValue) {
    return dataList.filter(function (data) {
      return rangePrice[checkValue](data.offer.price);
    });
  }

  function filterByData(posters) {
    var filterSelectList = document.querySelector('.map__filters').querySelectorAll('select');
    // var featuresList = document.querySelector('#housing-features').querySelectorAll('input');

    filterSelectList = Array.from(filterSelectList).filter(function (item) {
      return item.value !== 'any';
    });

    filterPosters = posters.slice();

    filterSelectList.forEach(function (filter) {
      switch (filter.id) {
        case 'housing-type':
          filterPosters = filterByValue(filterPosters, 'type', filter.value);
          break;
        case 'housing-price':
          filterPosters = filterByPrice(filterPosters, filter.value);
          break;
        case 'housing-rooms':
          filterPosters = filterByValue(filterPosters, 'rooms', filter.value);
          break;
        case 'housing-guests':
          filterPosters = filterByValue(filterPosters, 'guests', filter.value);
          break;
      }
    });

    return filterPosters;
  }

  function updateFilter() {
    // console.log('Обновила объявления + удалила предыдущие + удалила карточку');
    window.pins.deletePins();
    window.card.removeCard();
    var data = filterByData(window.serverRequest.posters);
    // filterByData(window.serverRequest.posters);
    window.pins.addPinsToDom(data);
    window.card.addCardToPin(data);
  }

  allFilters.addEventListener('change', updateFilter);


  // Экспорт функций модуля
  window.filter = {
    filterByData: filterByData,
    filterPosters: filterPosters
  };
})();
