'use strict';

/*модуль получения данных для обьявлений*/
( function () {

  const URL = 'https://js.dump.academy/keksobooking/data';

  /*ошибка запроса*/
  var onError = function (message) {
    console.error(message);
  };

/*успешный запрос*/
  var onSuccess = function (data) {
    window.annoncments = data;
  };

  window.xhr = new XMLHttpRequest();

  xhr.responseType = 'json';

  xhr.addEventListener('load', function(){
    var error;
    switch (xhr.status) {
      case 200:
        onSuccess(xhr.response);
        break;

      case 400:
        error = 'Неверный запрос';
        break;

      case 401:
        error = 'Пользователь не авторизирован';
        break;

      case 404:
        error = 'Ничего не найдено'
        break;

      default:
        error = 'Статус ответа : ' + xhr.status + ' ' + xhr.statusText;
        console.log(error);
    }
  });

  xhr.addEventListener('error', function () {
    onError('Произошла ошибка соединения');
  });

  xhr.addEventListener('timeout', function () {
    onError('Запрос не успел выполниться  за ' + xhr.timeout + ' мс');
  });

  /*время ожидания*/
  xhr.timeout = 10000;

  /*адрес и метод*/
  xhr.open('GET', URL);
  xhr.send();

})();
