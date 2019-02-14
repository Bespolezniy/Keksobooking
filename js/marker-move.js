'use strict';

/*перемещение маркера и активация страницы*/
( function () {

var marker = document.querySelector('.map__pin');
var addressField = document.querySelector('#address');

/*получение адреса*/
var getAddress = function (mark) {
  var addressValue = mark.style.left.slice(0, -2) + ' ' + mark.style.top.slice(0, -2);
  return addressValue;
}

var markerOn = function () {

};

/*событие активации карты*/
marker.addEventListener('mouseup', function () {
  var map = document.querySelector('.map').classList.remove('map--faded');

  getActiveMap();
  addressField.value = getAddress(marker);

  for (let i = 0; i < fieldsets.length; i++) {
    fieldsets[i].removeAttribute('disabled', '');
  }
});

})();
