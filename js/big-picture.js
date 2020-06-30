'use strict';

(function () {
  var AVATAR_SIZE = 35;

  var bigPictureWindow = document.querySelector('.big-picture');
  var bigPicture = bigPictureWindow.querySelector('.big-picture__img img');
  var likesCount = bigPictureWindow.querySelector('.likes-count');
  var commentsCount = bigPictureWindow.querySelector('.comments-count');
  var commentsContainer = bigPictureWindow.querySelector('.social__comments');
  var bigPictureCancelButton = bigPictureWindow.querySelector('.big-picture__cancel');

  var renderComment = function (data) {
    var comment = document.createElement('li');
    comment.classList.add('social__comment');

    var commentAvatar = document.createElement('img');
    commentAvatar.classList.add('social__picture');
    commentAvatar.src = data.avatar;
    commentAvatar.alt = data.name;
    commentAvatar.width = AVATAR_SIZE;
    commentAvatar.height = AVATAR_SIZE;

    var commentText = document.createElement('p');
    commentText.classList.add('social__text');
    commentText.textContent = data.message;

    comment.appendChild(commentAvatar);
    comment.appendChild(commentText);

    return comment;
  };

  var renderBigPicturelContent = function (data) {
    bigPicture.src = data.url;
    bigPicture.alt = data.description;

    likesCount.textContent = data.likes;
    commentsCount.textContent = data.comments.length;

    commentsContainer.innerHTML = '';

    var commentsFragment = document.createDocumentFragment();

    for (var i = 0; i < data.comments.length; i++) {
      commentsFragment.appendChild(renderComment(data.comments[i]));
    }

    commentsContainer.appendChild(commentsFragment);
  };

  var closeBigPictureWindow = function () {
    bigPictureWindow.classList.add('hidden');

    window.support.setBodyStatus();

    document.removeEventListener('keydown', onBigPictureWindowEscPress);
    bigPictureCancelButton.removeEventListener('click', onBigPictureWindowCancelClick);
  };

  var onBigPictureWindowEscPress = function (evt) {
    window.utility.isSimpleEscEvent(evt, closeBigPictureWindow);
  };

  var onBigPictureWindowCancelClick = function () {
    closeBigPictureWindow();
  };

  window.openBigPictureWindow = function (data) {
    renderBigPicturelContent(data);

    window.support.setBodyStatus(true);

    bigPictureWindow.querySelector('.social__comment-count').classList.add('hidden');
    bigPictureWindow.querySelector('.comments-loader').classList.add('hidden');

    bigPictureWindow.classList.remove('hidden');

    document.addEventListener('keydown', onBigPictureWindowEscPress);
    bigPictureCancelButton.addEventListener('click', onBigPictureWindowCancelClick);
  };
})();
