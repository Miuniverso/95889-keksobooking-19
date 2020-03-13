'use strict';

(function () {
  var posters = [];

  var Url = {
    get: 'https://js.dump.academy/keksobooking/data',
    post: 'https://js.dump.academy/keksobooking'
  };

  // var URL_GET = 'https://js.dump.academy/keksobooking/data';
  // var URL_POST = 'https://js.dump.academy/keksobooking';

  function makeRequest(url, onSuccess, onError) {
    var request = new XMLHttpRequest();

    request.addEventListener('load', function () {
      if (request.status === 200) {
        console.log('status 200');

        if (typeof (request.responseText) === 'string') {
          console.log('String');
          var allData = JSON.parse(request.responseText);

          allData.forEach(function (data) {
            window.serverRequest.posters.push(data);
          });
          console.log('posters: ' + posters);

          onSuccess(posters);

          console.log('Успешно');
        } else {
          console.log('Else');
          onSuccess(request.responseText);
        }

        // var allData = JSON.parse(request.responseText);
        //
        // allData.forEach(function (data) {
        //   window.serverRequest.posters.push(data);
        // });
        //
        // onSuccess(posters);
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
    return request;

    // request.open('GET', url, true);
    // request.send();
  }

  function loadData(onSuccess, onError) {
    console.log('LOAD DATA');
    var request = makeRequest(onSuccess, onError);
    request.open('GET', Url.get, true);
    request.send();
  }

  function postData(data, onSuccess, onError) {
    console.log('POST DATA');
    var request = makeRequest(onSuccess, onError);
    request.open('POST', Url.post, true);
    request.send(data);
  }

  // Экспорт данных из модуля
  window.serverRequest = {
    makeRequest: makeRequest,
    posters: posters,
    loadData: loadData,
    postData: postData
  };
})();
