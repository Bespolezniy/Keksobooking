'use strict';

/*модуль функционала карты*/
(function () {
  var listPins = document.querySelector('.map__pins');
  var mapFilterContainer = document.querySelector('.map__filters-container');
  var mapFeatures = document.querySelector('.map__features');

  window.utils.toggleDisabled(window.data.noticeForm, true);
  window.utils.toggleDisabled(window.data.mapFilters, true);

  /*активация фильтра*/
  mapFeatures.addEventListener('keydown', function (evt) {

    if (evt.keyCode === window.data.ENTER_KEYCODE && !evt.target.checked) {
      evt.target.checked = true;
    } else if (evt.keyCode === window.data.ENTER_KEYCODE && evt.target.checked) {
      evt.target.checked = false;
    }

  });

  /*маркеры на карту*/
  var setPinsOnMap = function (data) {
    var pinsOnMap = window.createPins(data);
    listPins.appendChild(pinsOnMap);
  };

  /*обьявления на карту*/
  var setCardOnMap = function (data) {
    var card = window.createCard(data);
    window.data.map.insertBefore(card, mapFilterContainer);
  };

  /*показать обьявление по клику*/
  var onCardShowClick = function (evt) {

    if (evt.target.closest('.map__pin') && !evt.target.closest('.map__pin--main')) {
      var clickedElement = parseInt(evt.target.closest('.map__pin').getAttribute('data-index'), 10);
      removeCard();

      evt.target.closest('.map__pin').classList.add('map__pin--active');
      setCardOnMap(window.data.filtratedPins[clickedElement]);

      var popupClose = document.querySelector('.popup__close');

      popupClose.addEventListener('click', onCardHideClick);
      document.addEventListener('keydown', onCardHideKeyDown);
      return;
    }
  };

  /*спрятить по клику*/
  var onCardHideClick = function (evt) {
    var card = document.querySelector('.map__card');
    var popupClose = document.querySelector('.popup__close');
    var pinActive = listPins.querySelector('.map__pin--active');

    if (evt.target.closest('.popup__close')) {
      card.remove();
      pinActive.classList.remove('map__pin--active');
      popupClose.removeEventListener('click', onCardHideClick);
      document.removeEventListener('keydown', onCardHideKeyDown);
    }
  };

  /* и по нажатию*/
  var onCardHideKeyDown = function (evt) {
    var card = document.querySelector('.map__card');
    var popupClose = document.querySelector('.popup__close');
    var pinActive = listPins.querySelector('.map__pin--active');

    if (evt.keyCode === window.data.ESC_KEYCODE) {
      card.remove();
      pinActive.classList.remove('map__pin--active');
      popupClose.removeEventListener('click', onCardHideClick);
      document.removeEventListener('keydown', onCardHideKeyDown);
    }
  };

  /*удаление маркеров*/
  var removePins = function () {
    var containerPins = document.querySelectorAll('.map__pin');
    Array.from(containerPins).forEach(function (element) {

      if (!element.classList.contains('map__pin--main')) {
        listPins.removeChild(element);
      }

    });
  };

  /*удаление обьявлений*/
  var removeCard = function () {
    var card = document.querySelector('.map__card');
    var pinActive = listPins.querySelector('.map__pin--active');

    if (card) {
      card.remove();
      pinActive.classList.remove('map__pin--active');
    }

  };

  /*бросаем ошибку*/
  var onError = function (msg) {
    throw new Error(msg);
  };

  /*нажатие на главный маркер*/
  var onMarkerMainMouseUp = function () {
    window.backend.loadData();
    window.data.map.classList.remove('map--faded');
    window.utils.toggleDisabled(window.data.noticeForm, false);
    window.data.noticeForm.classList.toggle('ad-form--disabled');
    listPins.addEventListener('click', onCardShowClick);
    window.data.marker.removeEventListener('mouseup', onMarkerMainMouseUp);
  };

  /*захват координат*/
  var getCoords = function (element) {
    var box = element.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  };

  /*положение главного маркера*/
  var setPositionMainMarker = function (markerX, markerY) {
    window.data.marker.style.left = markerX + 'px';
    window.data.marker.style.top = markerY + 'px';
  };

  /*передвижение маркера*/
  /*захват*/
  window.data.marker.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var coordsMap = getCoords(window.data.map);
    var coordsMainMarker = getCoords(window.data.marker);

    var shiftX = evt.pageX - coordsMainMarker.left + coordsMap.left;
    var shiftY = evt.pageY - coordsMainMarker.top;

    /*передвижение*/
    var onMainMarkerMouseMove = function (moveEvt) {
      var markerX = moveEvt.pageX - shiftX;
      var markerY = moveEvt.pageY - shiftY;

      /*проверка на вылет за пределы*/
      var checkArea = function (position, doptext) {

        var min = window.data['MIN_' + doptext];
        var max = window.data['MAX_' + doptext];

        position = position < min ? min : position;
        position = position > max ? max : position;

        return position;
      };

      /*проверяем*/
      var markerMainPositionX = checkArea(markerX, 'X');
      var markerMainPositionY = checkArea(markerY, 'Y');

      setPositionMainMarker(markerMainPositionX, markerMainPositionY);

      window.form.setAddreessCoords(markerMainPositionX, markerMainPositionY);
    };

    document.addEventListener('mousemove', onMainMarkerMouseMove);

    /*бросаем*/
    var onMarkerMainMouseUp = function () {
      document.removeEventListener('mousemove', onMainMarkerMouseMove);
      document.removeEventListener('mouseup', onMarkerMainMouseUp);
    };

    document.addEventListener('mouseup', onMarkerMainMouseUp);
  });

  window.data.marker.addEventListener('mouseup', onMarkerMainMouseUp);

  /*в глобальную*/
  window.map = {
    setPositionMainMarker: setPositionMainMarker,
    onMarkerMainMouseUp: onMarkerMainMouseUp,
    setPinsOnMap: setPinsOnMap,
    onError: onError,
    removePins: removePins,
    removeCard: removeCard,
  };

})();
