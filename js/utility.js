'use strict';

(function () {
  var Key = {
    ESC: 'Escape',
    ENTER: 'Enter'
  };

  var tagsInputField = document.querySelector('.text__hashtags');
  var descriptionInputField = document.querySelector('.text__description');

  var isEscNotInput = function (evt) {
    return evt.key === Key.ESC && evt.target !== tagsInputField && evt.target !== descriptionInputField;
  };

  window.utility = {
    isEnterEvent: function (evt, action) {
      var isEnter = evt.key === Key.ENTER;

      if (isEnter) {
        action();
      }
    },
    isEscEvent: function (evt, action) {
      if (isEscNotInput(evt)) {
        action();
      }
    },
    isSimpleEscEvent: function (evt, action) {
      var isEsc = evt.key === Key.ESC;

      if (isEsc) {
        action();
      }
    }
  };
})();
