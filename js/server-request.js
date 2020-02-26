'use strict';

(function () {
  var posters = [];
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');

  var request = new XMLHttpRequest();
  request.open('GET', 'https://js.dump.academy/keksoboking/data', true);

  function closeError() {
    main.removeChild(document.querySelector('.error'));
  }

  // появление окна с ошибкой
  function showErrorMessage(msg) {

    var errorClone = errorTemplate.cloneNode(true);
    var fragment = document.createDocumentFragment();

    console.log(msg);

    errorClone.querySelector('.error__message').innerHTML = msg;
    fragment.appendChild(errorClone);
    main.appendChild(fragment);

    // Закрытие окна с ошибкой
    window.addEventListener('click', closeError);
  }

  // сбор данных с сервера
  function parseOfData() {
    var allData = JSON.parse(request.responseText);

    allData.forEach(function (data) {
      posters.push(data);
    });
  }

  // отправка запроса и отлавливание ошибок
  function sendRequest() {
    try {
      request.send();
      if (request.status !== 200) {
        var errorMessage = 'Ошибка: ' + request.status + ' - ' + request.statusText;
        showErrorMessage(errorMessage);
      } else {
        parseOfData();
      }
    } catch (error) {
      showErrorMessage(error);
    }
  }

  // Экспорт данных из модуля
  window.serverRequest = {
    request: request,
    sendRequest: sendRequest,
    posters: posters
  };
})();
