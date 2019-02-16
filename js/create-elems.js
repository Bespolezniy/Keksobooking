'use strict';

/*модуль создания и отрисовки обьявлений и их маркеров */
(function () {

  window.getActiveMap = function () {

    var templatePin = document.querySelector('.map__pin');

    /*создание указателей*/
    var createPin = function (obj) {
      var pin = templatePin.cloneNode(true);

      pin.style = 'left:' + obj.location.x + 'px;' + ' top:' + obj.location.y + 'px;'
      pin.querySelector('img').src = obj.author.avatar;
      pin.querySelector('img').alt = obj.offer.title;

      return pin;
    };

    /*тип в нужный формат преобразуем*/
    var formatType = function (type) {
      var rightFormat;
      switch (type) {
        case 'palace':
          rightFormat = 'Дворец';
          break;
        case 'flat':
          rightFormat = 'Квартира';
          break;
        case 'house':
          rightFormat = 'Дом';
          break;
        case 'bungalo':
          rightFormat = 'Бунгало';
          break;
      }
      return rightFormat;
    };

    /*создание списка преимуществ*/
    var createFeature = function (features, list) {

      /*удаление шаблонного списка*/
      while (list.children.length) {
        list.children[0].remove();
      };

      /*создание своего*/
      features.forEach( function(element) {
        var li = document.createElement('li');
        var classLi = 'popup__feature--' + element;
        li.classList.add('popup__feature', classLi);
        list.appendChild(li);
      });

    }

    var fragment = document.createDocumentFragment();
    var templateCard = document.querySelector('#card').content.querySelector('.map__card');

    /*создание обьявлений*/
    var createCard = function (obj) {
      var card = templateCard.cloneNode(true);

      card.querySelector('.popup__avatar').src = obj.author.avatar;
      card.querySelector('.popup__title').textContent = obj.offer.title;
      card.querySelector('.popup__text--address').textContent = obj.offer.address;
      card.querySelector('.popup__text--price').textContent = obj.offer.price + ' ₽/ночь.';
      card.querySelector('.popup__type').textContent = formatType(obj.offer.type);
      card.querySelector('.popup__text--capacity').textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей.';
      card.querySelector('.popup__text--time').textContent = 'Заезд после ' + obj.offer.checkin + ' выезд до ' + obj.offer.checkout;
      createFeature(obj.offer.features, card.querySelector('.popup__features'));
      card.querySelector('.popup__description').textContent = obj.offer.description;
      card.querySelector('.popup__photo').src = obj.offer.photos[0];

      for (let i = 1; i < obj.offer.photos.length; i++) {
        var photoClone = document.querySelector('#card').content.querySelector('.popup__photo').cloneNode(true);

        photoClone.src = obj.offer.photos[i];
        card.querySelector('.popup__photos').appendChild(photoClone);
      }

      /*удаление обьявления*/
      card.querySelector('.popup__close').addEventListener('click', function () {
        card.remove();
      });

      return card;
    }

    /*маркеры на страницу*/
    window.setPinsOnMap = function (array) {

      var pinList = document.querySelector('.map__pins');
      window.map = document.querySelector('.map');

      for (let i = 0; i < array.length; i++) {
          var pinAnnoncment = createPin(array[i]);

          pinAnnoncment.setAttribute('data-index', i);
          fragment.appendChild(pinAnnoncment);
       }

      pinList.appendChild(fragment);

      fragment.appendChild(createCard(array[0]));
      map.appendChild(fragment);

    };

    setPinsOnMap(window.annoncments);

     /*обьявление по клику на маркер*/
    window.pins = document.querySelectorAll('.map__pin');

    pins.forEach(function(element){
      element.addEventListener('click', function(){
      var pinIndex = parseInt(element.getAttribute('data-index'));

      fragment.appendChild(createCard(window.annoncments[pinIndex]));
      map.appendChild(fragment);
      });
    });
  };

  window.removePins = function() {
    pins.forEach(function(element) {
      element.remove();
    });
  };

})();
