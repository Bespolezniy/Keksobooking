'use strict';

/*перемещение маркера и активация страницы*/
( function () {

  var marker = document.querySelector('.map__pin--main');
  var addressField = document.querySelector('#address');

  /*получение текущего адреса в зависимости от положения маркера*/
  var getAddress = function (mark) {
    var addressValue = mark.style.left.slice(0, -2) + ' ' + mark.style.top.slice(0, -2);
    return addressValue;
  };

  const ADDRESS_Y_INT_MIN = 130;
  const ADDRESS_Y_INT_MAX = 630;

  const MAIN_PIN = {
      SIDE: 62,
      HEIGHT: 84,
      ARROW_HEIGHT: 22,
      PEAK: 1
    };

  const COORDINATION_LIMIT_TOP = ADDRESS_Y_INT_MIN - MAIN_PIN.HEIGHT;
  const COORDINATION_LIMIT_BOTTOM = ADDRESS_Y_INT_MAX - MAIN_PIN.HEIGHT;

  /*перемещение маркера*/
  var moveMarker = function (evt) {
    var map = document.querySelector('.map');
    var mapCoord = map.getBoundingClientRect();
    var mapWidthLimRight = mapCoord.width + MAIN_PIN.PEAK;
    var mapWidthLimLeft = MAIN_PIN.PEAK;

    marker.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startPoint = {
        x: evt.clientX,
        y: evt.clientY
      }

    var onMouseMove = function (evtMove) {
      evtMove.preventDefault();

      var shift =  {
        x: startPoint.x - evtMove.clientX,
        y: startPoint.y - evtMove.clientY
      }

      var newPointY = marker.offsetTop - shift.y;
      var newPointX = marker.offsetLeft - shift.x;

      startPoint = {
        x: evtMove.clientX,
        y: evtMove.clientY
      }

      if (newPointY < COORDINATION_LIMIT_TOP) {
            newPointY = COORDINATION_LIMIT_TOP;
          } else if (newPointY > COORDINATION_LIMIT_BOTTOM) {
            newPointY = COORDINATION_LIMIT_BOTTOM;
          }

      if (newPointX < mapWidthLimLeft) {
            newPointX = mapWidthLimLeft;
          } else if (newPointX > mapWidthLimRight) {
            newPointX = mapWidthLimRight;
          }

      marker.style.top = newPointY + 'px';
      marker.style.left = newPointX + 'px';
    };

    var onMouseUp = function (evtUp) {
      evt.preventDefault();

        if (map.classList.contains('map--faded')) {
          map.classList.remove('map--faded');
          getActiveMap();
        }

      addressField.value = getAddress(marker);

      for (let i = 0; i < window.fieldsets.length; i++) {
        fieldsets[i].removeAttribute('disabled', '');
      };

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    });
  };

  moveMarker();

})();
