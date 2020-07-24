'use strict';

(function () {
  var picturesContainer = document.querySelector('.pictures');

  var renderPicture = function (imgData, template) {
    var img = template.cloneNode(true);

    img.querySelector('.picture__img').src = imgData.url;
    img.querySelector('.picture__likes').textContent = imgData.likes;
    img.querySelector('.picture__comments').textContent = imgData.comments.length;

    return img;
  };

  var renderGallery = function (data, template) {
    var fragment = document.createDocumentFragment();

    data.forEach(function (element) {
      fragment.appendChild(renderPicture(element, template));
    });

    return fragment;
  };

  window.gallery = {
    show: function (data) {
      var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

      picturesContainer.appendChild(renderGallery(data, pictureTemplate));

      var pictures = picturesContainer.querySelectorAll('.picture');

      pictures.forEach(function (element, i) {
        element.addEventListener('click', window.openBigPictureWindow.bind(null, data[i]));
      });
    },
    clear: function () {
      var pictures = picturesContainer.querySelectorAll('.picture');

      pictures.forEach(function (element) {
        element.remove();
      });
    }
  };
})();
