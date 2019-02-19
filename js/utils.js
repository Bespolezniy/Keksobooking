'use strict';

/*модуль дополнительных программ*/
(function () {
  /*устранение дребезга*/
  const DEBOUNCE_INTERVAL = 500;
  var debounce = function (callback) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;

      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }

      lastTimeout = window.setTimeout(function () {
        callback.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);

    };
  };

  /*блокировка и разблокировка формы*/
  var toggleDisabled = function (item, flag) {
    if (flag) {
      for (var i = 0; i < item.children.length; i++) {
        item.children[i].setAttribute('disabled', '');
      }
      return;
    }

    for (var j = 0; j < item.children.length; j++) {
      item.children[j].removeAttribute('disabled');
    }

  };

  /*в глобальную*/
  window.utils = {
    debounce: debounce,
    toggleDisabled: toggleDisabled
  };

})();
