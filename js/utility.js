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

  var isEnterEvent = function (evt, action) {
    var isEnter = evt.key === Key.ENTER;

    if (isEnter) {
      action();
    }
  };

  var isEscEvent = function (evt, action) {
    if (isEscNotInput(evt)) {
      action();
    }
  };

  var isSimpleEscEvent = function (evt, action) {
    var isEscape = evt.key === Key.ESC;

    if (isEscape) {
      action();
    }
  };

  window.utility = {
    isEnterEvent: isEnterEvent,
    isEscEvent: isEscEvent,
    isSimpleEscEvent: isSimpleEscEvent
  };
})();
