'use strict';

(function () {
  var posters = [];

  var request = new XMLHttpRequest();
  request.open('GET', 'https://js.dump.academy/keksobooking/data', true);
  request.addEventListener('load', onLoad);
  request.addEventListener('error', onError);
  // потом заменю консоль лог
  function onError(msg) {
    console.log('Сработало следующая ошибка: ' + msg);
  }

  function onLoad() {
    if (request.status !== 200) {
      console.log('Ответ' + request.status + ': ' + request.statusText);
    } else {
      console.log('Успешная загрузка');
    }
  }

  request.send();

  function parseOfData() {
    var allData = JSON.parse(request.responseText);

    allData.forEach(function (data) {
      posters.push(data);
    });
  }


  // Экспорт данных из модуля
  window.serverRequest = {
    posters: posters,
    parseOfData: parseOfData
  };
})();
