'use strict';

(function () {
  var MODAL_CLASS = 'modal-open';

  var tagBody = document.querySelector('body');

  var setBodyStatus = function (isModalOpen) {
    if (isModalOpen) {
      tagBody.classList.add(MODAL_CLASS);
    } else {
      tagBody.classList.remove(MODAL_CLASS);
    }
  };

  var getRandomValue = function (arr) {
    var randomIndex = Math.floor(Math.random() * arr.length);

    return arr[randomIndex];
  };

  var getRandomNumber = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  var getShuffledArray = function (arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var randomIndex = Math.floor(Math.random() * (i + 1));
      var buffer = arr[i];
      arr[i] = arr[randomIndex];
      arr[randomIndex] = buffer;
    }

    return arr;
  };

  var deleteArrayElements = function (arr, valueToDelete) {
    var cleanValues = [];

    arr.forEach(function (element) {
      var isValueToDelete = element === valueToDelete;

      if (!isValueToDelete) {
        cleanValues.push(element);
      }
    });

    return cleanValues;
  };

  var getElementLeftOffset = function (element) {
    return element.getBoundingClientRect().left;
  };

  window.support = {
    setBodyStatus: setBodyStatus,
    getRandomValue: getRandomValue,
    getRandomNumber: getRandomNumber,
    getShuffledArray: getShuffledArray,
    deleteArrayElements: deleteArrayElements,
    getElementLeftOffset: getElementLeftOffset
  };
})();
