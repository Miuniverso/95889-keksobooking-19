'use strict';

(function () {
  var posters = [];
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');

  var request = new XMLHttpRequest();
  request.open('GET', 'https://js.dump.academy/keksoboking/data', true);

  // отображение ошибок на странице
  request.addEventListener('load', onLoad);
  request.addEventListener('error', showErrorMessage);

  function closeError() {
    main.removeChild(document.querySelector('.error'));
  }

  // появление окна с ошибкой
  function showErrorMessage(msg) {

    var errorClone = errorTemplate.cloneNode(true);
    var fragment = document.createDocumentFragment();

    errorClone.querySelector('.error__message').innerHTML = msg;
    fragment.appendChild(errorClone);
    main.appendChild(fragment);

    // Закрытие окна с ошибкой
    errorClone.querySelector('.error__button').addEventListener('click', closeError);
    window.addEventListener('click', closeError);
  }

  function onLoad() {
    if (request.status !== 200) {
      var errorMessage = 'Ошибка: ' + request.status + ' - ' + request.statusText;
      showErrorMessage(errorMessage);
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
