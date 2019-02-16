'use strict';

/*модуль валидации формы*/
(function () {

  /*блокирование формы */
  window.noticeForm = document.querySelector('.ad-form');
  window.fieldsets = noticeForm.querySelectorAll('.ad-form fieldset');

  fieldsets.forEach(function(element){
    element.setAttribute('disabled', '');
  });

  var guestsAmount = noticeForm.querySelector('#capacity');
  var roomAmount = noticeForm.querySelector('#room_number');
  var price = noticeForm.querySelector('#price');

  /*создание сообщений об проверке заполненой формы*/
  var createMessage = function (selectorTemplate, selectorElement) {
    var exemple = document.querySelector(selectorTemplate).content.querySelector(selectorElement);
    var message = exemple.cloneNode(true);

    /*если невалидное обьявление*/
    if (selectorElement == '.error') {
      var btnClose = message.querySelector('.error__button');

      btnClose.addEventListener('click', function () {
        message.remove();

        if (guestsAmount.value > roomAmount.value) {
          alert('Количество комнат должно быть не меньше количества гостей!');
          guestsAmount.classList.add('unvalid__value');
          roomAmount.classList.add('unvalid__value');
        }

        if (price.value < 0) {
          alert('Цена не может быть отрицательной!');
          price.classList.add('unvalid__value');
        }
      });
    }

    return noticeForm.appendChild(message);
  }

  /*удалние сообщения*/
  var deleteMessage = function(message) {
    message.remove();
  }

  /*валидация*/
  noticeForm.addEventListener('submit', function(evt) {
    evt.preventDefault();

    if (guestsAmount.value > roomAmount.value || price.value < 0 ) {
      createMessage('#error', '.error');
    } else {
      var messageOk = createMessage('#success', '.success');

      messageOk.addEventListener('click', function (){
        messageOk.remove();
      });

      // создать объект для формы
      const URL_FORM = 'https://js.dump.academy/keksobooking.';
      var formData = new FormData(noticeForm);

      // отослать
      window.xhr.open("POST", URL_FORM);
      window.xhr.send(formData);
    }

  });

})();
