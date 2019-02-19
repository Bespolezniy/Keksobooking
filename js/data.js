'use strict';

/*модуль переменных*/
( function () {

  const MIN_X = 0;
  const MAX_X = 1134;
  const MIN_Y = 130;
  const MAX_Y = 630;
  const PIN_WIDTH = 50;
  const PIN_HEIGHT = 70;
  const PIN_MAIN_WIDTH = 65;
  const PIN_MAIN_HEIGHT = 84;
  const PIN_MAIN_X = 570;
  const PIN_MAIN_Y = 375;
  const PIN_LIMITS = 5;
  const ESC_KEYCODE = 27;
  const ENTER_KEYCODE = 13;
  const CAPACITY_DEFAULT_INDEX = 2;
  const PRICE_OF_TYPE_DEFAULT = 1000;

  var TYPES = {
    PALACE: 'Дворец',
    HOUSE: 'Дом',
    BUNGALO: 'Бунгало',
    FLAT: 'Кваритра'
  };

  var PRICE_OF_TYPE = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

  var noticeForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var marker = document.querySelector('.map__pin--main');
  var mapFilters = document.querySelector('.map__filters');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');
  var previewPhoto = document.querySelector('.ad-form__photo');
  var avatarFormSrc = previewAvatar.src;

  window.data = {
    MIN_X: MIN_X,
    MAX_X: MAX_X,
    MIN_Y: MIN_Y,
    MAX_Y: MAX_Y,
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,
    PIN_MAIN_WIDTH: PIN_MAIN_WIDTH,
    PIN_MAIN_HEIGHT: PIN_MAIN_HEIGHT,
    PIN_MAIN_X: PIN_MAIN_X,
    PIN_MAIN_Y: PIN_MAIN_Y,
    PIN_LIMITS: PIN_LIMITS,
    TYPES: TYPES,
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
    CAPACITY_DEFAULT_INDEX: CAPACITY_DEFAULT_INDEX,
    PRICE_OF_TYPE_DEFAULT: PRICE_OF_TYPE_DEFAULT,
    PRICE_OF_TYPE: PRICE_OF_TYPE,
    noticeForm: noticeForm,
    map: map,
    marker: marker,
    mapFilters: mapFilters,
    previewAvatar: previewAvatar,
    avatarFormSrc: avatarFormSrc,
    previewPhoto: previewPhoto
  };

})();
