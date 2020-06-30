'use strict';

(function () {
  var MODAL_CLASS = 'modal-open';

  var tagBody = document.querySelector('body');

  window.support = {
    setBodyStatus: function (isModalOpen) {
      if (isModalOpen) {
        tagBody.classList.add(MODAL_CLASS);
      } else {
        tagBody.classList.remove(MODAL_CLASS);
      }
    },
    getRandomValue: function (arr) {
      var randomIndex = Math.floor(Math.random() * arr.length);

      return arr[randomIndex];
    },
    getRandomNumber: function (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    },
    getShuffledArray: function (arr) {
      for (var i = arr.length - 1; i > 0; i--) {
        var randomIndex = Math.floor(Math.random() * (i + 1));
        var buffer = arr[i];
        arr[i] = arr[randomIndex];
        arr[randomIndex] = buffer;
      }

      return arr;
    },
    deleteArrayElements: function (arr, valueToDelete) {
      var cleanValues = [];

      for (var i = 0; i < arr.length; i++) {
        var isValueToDelete = arr[i] === valueToDelete;

        if (!isValueToDelete) {
          cleanValues.push(arr[i]);
        }
      }

      return cleanValues;
    }
  };
})();
