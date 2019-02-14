'use strict';

/*модуль создания обьявлений и маркеров*/
( function () {

window.getActiveMap = function () {

/*шаблонные данные*/
var avatarsList = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png'
];

var titleList = [
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var typeList = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

var timeList = [
  '12:00',
  '13:00',
  '14:00'
];

var featuresList = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
]

var photosList = [
  "http://o0.github.io/assets/images/tokyo/hotel1.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
]

const MIN_PRICE = 1000;
const MAX_PRICE = 1000000;
const MIN_ROOMS = 1;
const MAX_ROOMS = 5;
const MIN_X = 1;
const MAX_X = 1190;
const MIN_Y = 130;
const MAX_Y = 630;

/*случайный элемент массива*/
var getRandomIndex = function(array) {
 return  Math.floor(Math.random() * array.length);
}

/*случайное число в пределах max и min */
var getRandomNumber = function(minValue, maxValue) {
  var random = minValue + Math.random() * (maxValue + 1 - minValue);
  return Math.floor(random);
};

/*перемешивание массива*/
var compareRandom = function(a, b) {
  return Math.random() - 0.5;
};

/*массив случайной длинны*/
var getRandomArray = function(array) {
  array.sort(compareRandom);
  var start = getRandomIndex(array);
  return array.slice(start);
}

/*создание обьектов с данными для обьявлений*/
var createObj = function () {
  var locationX = getRandomNumber(MIN_X, MAX_X);
  var locationY = getRandomNumber(MIN_Y, MAX_Y)
  var annoncmentObj = {

    author : {
      avatar: avatarsList[getRandomIndex(avatarsList)]
    },

    offer : {
      title : titleList[getRandomIndex(titleList)],
      address : locationX + ',' + locationY,
      price: getRandomNumber(MIN_PRICE, MAX_PRICE),
      type : typeList[getRandomIndex(typeList)],
      rooms: getRandomNumber(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomNumber(1, 10),
      checkin: timeList[getRandomIndex(timeList)],
      checkout: timeList[getRandomIndex(timeList)],
      features: getRandomArray(featuresList),
      description: '',
      photos: photosList.sort(compareRandom)
    },

    location : {
      x: locationX,
      y: locationY
    }
  }

  return annoncmentObj;
}

/*создание массива с этими обьектами*/
var annoncmentAmount = 8;
var annoncments = [];

for (let i = 0; i < annoncmentAmount ; i++) {
  annoncments.push(createObj());
}

var templatePin = document.querySelector('.map__pin');

/*создание указателей*/
var createPin = function (obj) {
  var pin = templatePin.cloneNode(true);

  pin.style = 'left:' + obj.location.x + 'px;' + ' top:' + obj.location.y + 'px;'
  pin.querySelector('img').src = obj.author.avatar;
  pin.querySelector('img').alt = obj.offer.title;

  return pin;
}

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
}

/*создание списка преимуществ*/
var createFeature = function (features, list) {
  /*удаление шаблонного списка*/
  while (list.children.length) {
    list.children[0].remove();
  }
  /*создание своего*/
  for (let i = 0; i < features.length; i++) {
    var li = document.createElement('li');
    var classLi = 'popup__feature--' + features[i];
    li.classList.add('popup__feature', classLi);
    list.appendChild(li);
  }
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

  return card;
}

/*маркеры на страницу*/
var pinList = document.querySelector('.map__pins');
var map = document.querySelector('.map');

for (let i = 0; i < annoncmentAmount; i++) {
  var pinAnnoncment = createPin(annoncments[i]);
  pinAnnoncment.setAttribute('data-index', i);
  fragment.appendChild(pinAnnoncment);
}

pinList.appendChild(fragment);

fragment.appendChild(createCard(annoncments[0]));
map.appendChild(fragment);

/*обьявление по клику на маркер*/

var pins = document.querySelectorAll('.map__pin');
for (let i = 0; i < pins.length; i++) {
  pins[i].addEventListener('click', function(){
    var pinIndex = parseInt(pins[i].getAttribute('data-index'));
    fragment.appendChild(createCard(annoncments[pinIndex]));
    map.appendChild(fragment);
  });
}

}})();
