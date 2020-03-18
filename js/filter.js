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

  var count = {
    min: 0,
    max: 5
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

  function filterByFeatures(dataList, checkValue) {
    return dataList.filter(function (data) {
      return data.offer.features.includes(checkValue);
    });
  }

  function filterByData(data) {

    var filterSelectList = document.querySelector('.map__filters').querySelectorAll('select');
    var featuresList = document.querySelector('#housing-features').querySelectorAll('input[type="checkbox"]:checked');

    filterSelectList = Array.from(filterSelectList).filter(function (item) {
      return item.value !== 'any';
    });

    filterPosters = data;
    var newFilterList = filterPosters.slice();

    filterSelectList.forEach(function (filter) {
      switch (filter.id) {
        case 'housing-type':
          newFilterList = filterByValue(newFilterList, 'type', filter.value);
          break;
        case 'housing-price':
          newFilterList = filterByPrice(newFilterList, filter.value);
          break;
        case 'housing-rooms':
          newFilterList = filterByValue(newFilterList, 'rooms', filter.value);
          break;
        case 'housing-guests':
          newFilterList = filterByValue(newFilterList, 'guests', filter.value);
          break;
      }
    });

    featuresList.forEach(function (feature) {
      newFilterList = filterByFeatures(newFilterList, feature.value);
    });


    window.pins.addToDom(newFilterList.slice(count.min, count.max));
    window.card.addToPin(newFilterList.slice(count.min, count.max));

    return newFilterList;
  }

  function updateFilter() {
    window.pins.delete();
    window.card.remove();
    filterByData(filterPosters);
  }

  var updateFillterHandler = window.optimization.debaunce(updateFilter);

  allFilters.addEventListener('change', updateFillterHandler);


  // Экспорт функций модуля
  window.filter = {
    update: filterByData
    // filterPosters: filterPosters
  };
})();
