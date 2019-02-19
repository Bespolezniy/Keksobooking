'use strict';

/*модуль создания обьявлений*/
(function () {
  var cardTemplate = document.querySelector('#card');

  /*клонируем шаблон*/
  window.createCard = function (data) {
    var card = cardTemplate.content.cloneNode(true);
    var cardTitle = card.querySelector('.popup__title');
    var cardAddress = card.querySelector('.popup__text--address');
    var cardPrice = card.querySelector('.popup__text--price');
    var cardType = card.querySelector('.popup__type');
    var cardCapacity = card.querySelector('.popup__text--capacity');
    var cardTime = card.querySelector('.popup__text--time');
    var cardFeatures = card.querySelector('.popup__features');
    var cardDescription = card.querySelector('.popup__description');
    var cardPhotos = card.querySelector('.popup__photos');
    var cardAvatar = card.querySelector('.popup__avatar');

    var getFieldsCard = function (field, value, textPrice) {

      if (value) {
        textPrice = textPrice || '';
        field.textContent = value + textPrice;
        return true;
      }

      field.textContent = '';
      return true;
    };

    /*заполняем поле тип*/
    var getTypeField  = function (field, type) {
      field.textContent = type ? window.data.Types[type.toUpperCase()] : '';
    };

    /*заполняем поле гости*/
    var getCapacityField  = function (field, rooms, guests, textRooms, textGuests) {
      field.textContent = rooms && guests ? rooms + textRooms + guests + textGuests : '';
    };

    /*заполняем поля прибытие и отъезд*/
    var getTimeField  = function (field, arrival, departure, textArival, textDeparture) {
      field.textContent = arrival && departure ? textArival + arrival + textDeparture + departure : '';
    };

    /*заполняем поле преимуществ*/
    var getFeaturesField = function (field, features) {

        features.forEach(function(element){
          var featuresClass = '.popup__feature--' + element;
          var element = field.querySelector(featuresClass);
          element.style.display = 'inline-block';
        });

      }

    /*заполняем фото*/
    var getPhotosField = function (field, photos) {

       photos.forEach(function (element) {
         var img = document.createElement('img');
         img.classList.add('popup__photo');
         img.width = '45';
         img.height = '40';
         img.alt = 'Фотография жилья';
         img.src = element;
         field.appendChild(img);
       });

      }

    /*получить аватарку*/
    var getAvatarField = function (field, avatar) {

      if (avatar) {
        field.src = avatar;
        return true;
      }

      field.style.display = 'none';
      return true;
    };

    /*создание*/
    getFieldsCard(cardTitle, data.offer.title);
    getFieldsCard(cardAddress, data.offer.address);
    getFieldsCard(cardPrice, data.offer.price, '₽/ночь');
    getFieldsCard(cardAddress, data.offer.address);
    getTypeFieldCard(cardType, data.offer.type);
    getCapacityFieldCard(cardCapacity, data.offer.rooms, data.offer.guests, ' команты для ', ' гостей');
    getTimeFieldCard(cardTime, data.offer.checkin, data.offer.checkout, 'Заезд после ', ', выезд до ');
    getFeaturesFieldCard(cardFeatures, data.offer.features);
    getFieldsCard(cardDescription, data.offer.description);
    getPhotosFieldCard(cardPhotos, data.offer.photos);
    getAvatarFieldCard(cardAvatar, data.author.avatar);

    var cardTabIndex = card.querySelector('.popup__close');
    cardTabIndex.setAttribute('tabindex', '0');

    return card;
  }

})();
