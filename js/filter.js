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

  function filterByData() {

    console.log('Filter');

    var filterSelectList = document.querySelector('.map__filters').querySelectorAll('select');
    // var featuresList = document.querySelector('#housing-features').querySelectorAll('input');

    filterSelectList = Array.from(filterSelectList).filter(function (item) {
      return item.value !== 'any';
    });


    filterPosters = window.serverRequest.posters;

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

    window.pins.addPinsToDom(filterPosters.slice(0, 5));
    window.card.addCardToPin(filterPosters.slice(0, 5));

    return filterPosters;
  }

  // боль начиинается где-то здесь, как я поняла
  function updateFilter() {
    window.pins.deletePins();
    window.card.removeCard();
    filterByData();
    // window.pins.addPinsToDom(data);
    // window.card.addCardToPin(data);
  }

  allFilters.addEventListener('change', updateFilter);


  // Экспорт функций модуля
  window.filter = {
    filterByData: filterByData,
    filterPosters: filterPosters
  };
})();
