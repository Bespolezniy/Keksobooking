'use strict';

/*модуль загразки и отправки данных */
(function () {
  const URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  const URL_UPLOAD = 'https://js.dump.academy/keksobooking';
  const STATUS_SUCCESS = 200;
  const TIMEOUT = 10000;

  /*загрузка данных*/
  var onMainMarkerLoad = function (evt) {
    var xhr = evt.currentTarget;

    if (xhr.status !== STATUS_SUCCESS) {
      window.map.onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      return;
    }

    window.data.originPins = xhr.response;
    window.data.filtratedPins = xhr.response;
    window.utils.toggleDisabled(window.data.mapFilters, false);
    window.map.setPinsOnMap(window.data.originPins);
    return;
  };

  /*отправка данных*/
  var onBtnFormLoad = function (evt) {
    var xhr = evt.currentTarget;

    if (xhr.status !== STATUS_SUCCESS) {
      window.form.onError();
      window.map.onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      return;
    }

    window.form.onSuccess();
  };

  /*ошибка при отправке*/
  var addErrorMessage = function (method) {

    if (method === 'POST') {
      window.form.onError();
    }

  };

  var serverRequest = function (method, URL, callback, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', callback);

    xhr.addEventListener('error', function () {
      addErrorMessage(method);
      window.map.onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      addErrorMessage(method);
      window.map.onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    xhr.open(method, URL);

    if (method === 'POST') {
      xhr.send(data);
      return;
    }

    xhr.send();
  };

  /*функция вызова загрузки*/
  function loadData() {
    serverRequest('GET', URL_LOAD, onMainMarkerLoad);
  }

  /*функция вызова отправления*/
  function uploadData(data) {
    serverRequest('POST', URL_UPLOAD, onBtnFormLoad, data);
  }

  /*в глобальную*/
  window.backend = {
    loadData: loadData,
    uploadData: uploadData
  };

})();
