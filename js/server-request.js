'use strict';

(function () {
  var posters = [];

  function onSuccesLoad(url, onSuccess, onError) {
    var request = new XMLHttpRequest();

    request.addEventListener('load', function () {
      if (request.status === 200) {
        onSuccess(request.responseText);
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

    request.timeout = 10000; // 10s

    request.open('GET', url, true);
    request.send();
  }

  // Экспорт данных из модуля
  window.serverRequest = {
    onSuccesLoad: onSuccesLoad,
    posters: posters
  };
})();
