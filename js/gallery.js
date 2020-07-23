'use strict';

(function () {
  var picturesContainer = document.querySelector('.pictures');

  var renderPicture = function (imageData, template) {
    var imageElement = template.cloneNode(true);

    imageElement.querySelector('.picture__img').src = imageData.url;
    imageElement.querySelector('.picture__likes').textContent = imageData.likes;
    imageElement.querySelector('.picture__comments').textContent = imageData.comments.length;

    return imageElement;
  };

  var renderGallery = function (data, template) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(renderPicture(data[i], template));
    }

    return fragment;
  };

  window.gallery = {
    show: function (data) {
      var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

      picturesContainer.appendChild(renderGallery(data, pictureTemplate));

      var pictures = picturesContainer.querySelectorAll('.picture');

      for (var i = 0; i < pictures.length; i++) {
        pictures[i].addEventListener('click', window.openBigPictureWindow.bind(null, data[i]));
      }
    },
    clear: function () {
      var pictures = picturesContainer.querySelectorAll('.picture');

      pictures.forEach(function (element) {
        element.remove();
      });
    }
  };
})();
