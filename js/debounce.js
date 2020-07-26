'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout;

  var setDebounce = function (action) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }

    lastTimeout = window.setTimeout(action, DEBOUNCE_INTERVAL);
  };

  window.debounce = {
    set: setDebounce
  };
})();
