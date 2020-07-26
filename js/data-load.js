'use strict';

(function () {
  var picturesContainer = document.querySelector('.pictures');

  var showError = function (response) {
    var result = document.createElement('p');

    result.textContent = response;
    picturesContainer.appendChild(result);
  };

  var receiveData = function (data) {
    window.filters.init(data);
  };

  window.backend.load(receiveData, showError);
})();
