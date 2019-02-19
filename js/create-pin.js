'use strict';

/*модуль создания маркеров*/
(function () {
  var pinTemplate = document.querySelector('#pin');

  window.createPins = function (data) {
      var fragment = document.createDocumentFragment();

      for (let i = 0; i < data.length; i++) {

        if (i >= window.data.PIN_LIMITS) {
          break;
        }

        var pin = pinTemplate.content.cloneNode(true);
        var pinBtn = pin.querySelector('.map__pin');
        var pinImg = pin.querySelector('img');
        var pinPositionX = data[i].location.x - window.data.PIN_WIDTH / 2;
        var pinPositionY = data[i].location.y - window.data.PIN_HEIGHT;

        pinBtn.setAttribute('data-index', i);
        pinBtn.style.left = pinPositionX + 'px';
        pinBtn.style.top = pinPositionY + 'px';
        pinImg.src = data[i].author.avatar;
        pinImg.alt = data[i].offer.title;

        fragment.appendChild(pin);
      }
    return fragment;
  }
})();
