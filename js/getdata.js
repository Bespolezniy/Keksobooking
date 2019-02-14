'use strict';

/*модуль получения данных для обьявлений*/
( function () {

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
  window.annoncmentAmount = 8;
  window.annoncments = [];

  for (let i = 0; i < annoncmentAmount ; i++) {
    annoncments.push(createObj());
  }

})();
