'use strict';

/*модуль формы и ее валидации*/
(function () {
  var guestsAmount = document.querySelector('#capacity');
  var roomAmount = document.querySelector('#room_number');
  var price = document.querySelector('#price');
  var address = document.querySelector('#address');
  var typeHousing = document.querySelector('#type');
  var resetForm = document.querySelector('.ad-form__reset');
  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');
  var success;
  var error;
  var main;

  /*текущие кординаты в инпут аддреса*/
  var setAddreessCoords = function (x, y) {
    var markerX = Math.floor(x + window.data.PIN_MAIN_WIDTH / 2);
    var markerY = Math.floor(y + window.data.PIN_MAIN_HEIGHT);

    address.setAttribute('disabled', '');

    address.value = markerX + ', ' + markerY;
  };

  setAddreessCoords(window.data.PIN_MAIN_X, window.data.PIN_MAIN_Y);

  /*плэйсхолдер*/
  var setPlaceholderAndMinPrice = function (minValue) {
    price.placeholder = minValue;
    price.min = minValue;
  };

  var onTypeHousing = function (evt) {
    setPlaceholderAndMinPrice(window.data.PRICE_OF_TYPE[evt.target.value.toUpperCase()]);
  };

  typeHousing.addEventListener('input', onTypeHousing);

  /*блокировка не нужных комнат*/
  var disabledRooms = function () {

   for (let i = 0; i < guestsAmount.options.length; i++) {
     guestsAmount.options[i].setAttribute('disabled', '');
   }

  };

  /*разблокировка нужных комнат*/
  var includeRooms = function (index) {
    guestsAmount.options[index].removeAttribute('disabled');
  };

  /*валидация комнат*/
  var onRooms = function () {
    guestsAmount.value = roomAmount.value === '100' ? '0' : roomAmount.value;
    disabledRooms();

    for (let j = 0; j < guestsAmount.options.length; j++) {

      if (guestsAmount.value === '3' && j < 3) {
        includeRooms(j);
      } else if (guestsAmount.value === '2' && j > 0 && j < 3) {
        includeRooms(j);
      } else if (guestsAmount.value === '1' && j === 2) {
        includeRooms(j);
      } else if (guestsAmount.value === '0' && j === 3) {
        includeRooms(j);
      }
    }

  };

  onRooms();
  roomAmount.addEventListener('input', onRooms);

  var setTimeinAndTimeout = function (time) {
    timein.value = time;
    timeout.value = time;
  };

  /*ввод времени*/
  var onTimeinTimeoutFields = function (evt) {
    setTimeinAndTimeout(evt.target.value);
  };

  timein.addEventListener('input', onTimeinTimeoutFields);
  timeout.addEventListener('input', onTimeinTimeoutFields);

  /*сброс формы после отправки*/
  var removeSuccessForm = function () {
    var successMessage = document.querySelector('.success');

    if (successMessage) {
      successMessage.remove();
      address.setAttribute('disabled', '');
      return;
    }
  };

  /*сброс после ошибки*/
  var removeErrorForm = function () {
    var errorMessage = document.querySelector('.error');

    if (errorMessage) {
      errorMessage.remove();
      return;
    }
  };

  /*сброс по клику*/
  var onFormHideClick = function () {
    removeSuccessForm();
    removeErrorForm();
    document.removeEventListener('keydown', onFormHideKeydown);
    document.removeEventListener('click', onFormHideClick);
  };

  /*по нажатию*/
  var onFormHideKeydown = function (evt) {

    if (evt.keyCode === window.data.ESC_KEYCODE) {
      removeSuccessForm();
      removeErrorForm();
      document.removeEventListener('keydown', onFormHideKeydown);
      document.removeEventListener('click', onFormHideClick);
    }

  };

  /*созадние сообщения об успехе*/
  var onSuccess = function () {
    success = success ? success : document.querySelector('#success');
    var successForm = success.content.cloneNode(true);
    main = main ? main : document.querySelector('main');

    removeSuccessForm();
    onFormResetClick();
    main.appendChild(successForm);

    document.addEventListener('keydown', onFormHideKeydown);
    document.addEventListener('click', onFormHideClick);
  };

  /*созадние сообщения об ошибке*/
  var onError = function () {
    error = error ? error : document.querySelector('#error');
    var errorForm = error.content.cloneNode(true);
    main = main ? main : document.querySelector('main');
    removeErrorForm();
    main.appendChild(errorForm);
    var errorButton = document.querySelector('.error__button');
    document.addEventListener('keydown', onFormHideKeydown);
    document.addEventListener('click', onFormHideClick);
    /*сброс*/
    errorButton.addEventListener('mousedown', function () {
      window.load.uploadData(new FormData(window.data.noticeForm));
    });
  };

  window.data.noticeForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    address.removeAttribute('disabled');
    window.load.uploadData(new FormData(window.data.noticeForm));
  });

  var onFormResetClick = function () {
    window.data.noticeForm.reset();
    guestsAmount.options[guestsAmount.options.selectedIndex].removeAttribute('selected');
    guestsAmount.options[window.data.CAPACITY_DEFAULT_INDEX].setAttribute('selected', '');
    window.data.previewAvatar.src = window.data.avatarFormSrc;
    window.utils.toggleDisabled(window.data.noticeForm, true);
    window.utils.toggleDisabled(window.data.mapFilters, true);
    window.avatar.removePhoto();
    window.map.removeCard();
    window.map.removePins();
    window.data.map.classList.add('map--faded');
    window.data.noticeForm.classList.toggle('ad-form--disabled');
    setPlaceholderAndMinPrice(window.data.PRICE_OF_TYPE_DEFAULT);
    window.map.setPositionPinMain(window.data.PIN_MAIN_X, window.data.PIN_MAIN_Y);
    setAddreessCoords(window.data.PIN_MAIN_X, window.data.PIN_MAIN_Y);
    window.data.marker.addEventListener('mouseup', window.map.onMarkerMouseup);
  };

  /*сброс*/
  resetForm.addEventListener('click', onFormResetClick);

  /*в глобальную*/
  window.form = {
    setAddreessCoords: setAddreessCoords,
    onSuccess: onSuccess,
    onError: onError
  };

})();
