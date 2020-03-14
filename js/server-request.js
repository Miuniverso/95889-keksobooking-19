'use strict';

(function () {
  var posters = [];

  var Url = {
    get: 'https://js.dump.academy/keksobooking/data',
    post: 'https://js.dump.academy/keksobooking'
  };

  var TIMEOUT = 10000;

  function makeRequest(url, method, data, onSuccess, onError) {
    var request = new XMLHttpRequest();

    request.addEventListener('load', function () {
      if (request.status === 200) {
        var allData = JSON.parse(request.responseText);

        allData.forEach(function (poster) {
          window.serverRequest.posters.push(poster);
        });
        onSuccess(posters);
      } else {
        onError('Cтатус ответа: ' + request.status + ' ' + request.statusText);
      }
    });

    request.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    request.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + request.timeout + 'мс');
    });

    request.timeout = TIMEOUT; // 10s

    request.open(method, url);
    var params = data ? new FormData(data) : data;
    request.send(params);
  }

  function loadData(onSuccess, onError) {
    makeRequest(Url.get, 'GET', false, onSuccess, onError);
  }

  function postData(data, onSuccess, onError) {
    makeRequest(Url.post, 'POST', data, onSuccess, onError);
  }

  // Экспорт данных из модуля
  window.serverRequest = {
    makeRequest: makeRequest,
    posters: posters,
    loadData: loadData,
    postData: postData
  };
})();
