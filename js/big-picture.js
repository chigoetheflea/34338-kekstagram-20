'use strict';

(function () {
  var AVATAR_SIZE = 35;
  var COMMENTS_PORTION_SIZE = 5;

  var bigPictureWindow = document.querySelector('.big-picture');
  var bigPicture = bigPictureWindow.querySelector('.big-picture__img img');
  var likesCount = bigPictureWindow.querySelector('.likes-count');
  var commentsCountContainer = bigPictureWindow.querySelector('.social__comment-count');
  var commentsContainer = bigPictureWindow.querySelector('.social__comments');
  var moreCommentsButton = bigPictureWindow.querySelector('.comments-loader');
  var bigPictureCancelButton = bigPictureWindow.querySelector('.big-picture__cancel');
  var commentsAllLength = null;

  var renderComment = function (data) {
    var comment = document.createElement('li');
    comment.classList.add('social__comment', 'hidden');

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

  var showComments = function () {
    var commentsToShow = commentsContainer.querySelectorAll('.hidden');
    var isEnoughComments = commentsToShow.length > COMMENTS_PORTION_SIZE;
    var currentCommentsPortion = isEnoughComments ? COMMENTS_PORTION_SIZE : commentsToShow.length;

    for (var i = 0; i < currentCommentsPortion; i++) {
      commentsToShow[i].classList.remove('hidden');
    }

    if (!isEnoughComments) {
      moreCommentsButton.classList.add('hidden');
    }

    commentsCountContainer.innerHTML = (commentsAllLength - (commentsToShow.length - currentCommentsPortion)) + ' из <span class="comments-count">' + commentsAllLength + '</span> комментариев';
  };

  var onMoreCommentsButtonClick = function () {
    showComments();
  };

  var renderBigPictureContent = function (data) {
    var commentsCount = data.comments.length;
    var isMoreComments = commentsCount > COMMENTS_PORTION_SIZE;

    bigPicture.src = data.url;
    bigPicture.alt = data.description;
    likesCount.textContent = data.likes;
    commentsAllLength = data.comments.length;

    commentsContainer.innerHTML = '';

    var commentsFragment = document.createDocumentFragment();

    for (var i = 0; i < data.comments.length; i++) {
      commentsFragment.appendChild(renderComment(data.comments[i]));
    }

    commentsCountContainer.classList.add('hidden');
    moreCommentsButton.classList.add('hidden');

    if (isMoreComments) {
      moreCommentsButton.addEventListener('click', onMoreCommentsButtonClick);

      commentsCountContainer.classList.remove('hidden');
      moreCommentsButton.classList.remove('hidden');
    }

    commentsContainer.appendChild(commentsFragment);
  };

  var closeBigPictureWindow = function () {
    bigPictureWindow.classList.add('hidden');

    window.support.setBodyStatus();

    document.removeEventListener('keydown', onBigPictureWindowEscPress);
    bigPictureCancelButton.removeEventListener('click', onBigPictureWindowCancelClick);
    moreCommentsButton.removeEventListener('click', onMoreCommentsButtonClick);
  };

  var onBigPictureWindowEscPress = function (evt) {
    window.utility.isSimpleEscEvent(evt, closeBigPictureWindow);
  };

  var onBigPictureWindowCancelClick = function () {
    closeBigPictureWindow();
  };

  window.openBigPictureWindow = function (data) {
    renderBigPictureContent(data);

    window.support.setBodyStatus(true);

    bigPictureWindow.classList.remove('hidden');

    showComments();

    document.addEventListener('keydown', onBigPictureWindowEscPress);
    bigPictureCancelButton.addEventListener('click', onBigPictureWindowCancelClick);
  };
})();
