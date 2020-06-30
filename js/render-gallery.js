'use strict';

(function () {
  var IMAGES_COUNT = 25;

  var imagesData = window.support.getShuffledArray(window.generateInfo(IMAGES_COUNT));
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

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

  document.querySelector('.pictures').appendChild(renderGallery(imagesData, pictureTemplate));

  var pictures = document.querySelectorAll('.picture');

  for (var i = 0; i < pictures.length; i++) {
    pictures[i].addEventListener('click', window.openBigPictureWindow.bind(null, imagesData[i]));
  }
})();
