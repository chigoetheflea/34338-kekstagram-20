'use strict';

var NAMES = [
  'Анна',
  'Дмитрий',
  'Елена',
  'Андрей',
  'Светлана',
  'Владимир',
  'Яна',
  'Максим',
  'Алиса',
  'Антон',
  'Марина',
  'Сергей',
  'Пельмешка'
];

var COMMENT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var DESCRIPTION_PHRASES = [
  'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты',
  'Вдали от всех живут они в буквенных домах на берегу Семантика большого языкового океана',
  'Маленький ручеек Даль журчит по всей стране и обеспечивает ее всеми необходимыми правилами',
  'Эта парадигматическая страна, в которой жаренные члены предложения залетают прямо в рот',
  'Даже всемогущая пунктуация не имеет власти над рыбными текстами, ведущими безорфографичный образ жизни',
  'Однажды одна маленькая строчка рыбного текста по имени Lorem ipsum решила выйти в большой мир грамматики'
];

var IMAGES_COUNT = 25;
var COMMENTS_COUNT = 5;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var MIN_AVATAR_NUMBER = 1;
var MAX_AVATAR_NUMBER = 6;
var AVATAR_SIZE = 35;
var MIN_SCALE = 25;
var MAX_SCALE = 100;
var SCALE_STEP = 25;
var DEFAULT_EFFECT = 'none';
var DEFAULT_EFFECT_VALUE = 100;
var TAG_MAX_LENGTH = 20;
var MAX_TAGS_COUNT = 5;
var TAG_SYMBOL = '#';

var effectNames = {
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat'
};

var tagBody = document.querySelector('body');
var modalPictureWindow = document.querySelector('.big-picture');

var setBodyStatus = function (flag) {
  if (flag) {
    tagBody.classList.add('modal-open');
  } else {
    tagBody.classList.remove('modal-open');
  }
};

var getRandomValue = function (arr) {
  var randomIndex = Math.floor(Math.random() * arr.length);

  return arr[randomIndex];
};

var getRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var getMessage = function (count) {
  var firstSentence = getRandomValue(COMMENT_MESSAGES);

  if (count === 2) {
    do {
      var secondSentence = getRandomValue(COMMENT_MESSAGES);
    } while (secondSentence === firstSentence);

    firstSentence = firstSentence + ' ' + secondSentence;
  }

  return firstSentence;
};

var getComments = function () {
  var comments = [];
  var commentsCount = getRandomNumber(0, COMMENTS_COUNT);
  var sentensesCount = Math.random() > 0.5 ? 2 : 1;

  for (var i = 0; i < commentsCount; i++) {
    var commentsItem = {
      avatar: 'img/avatar-' + getRandomNumber(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER) + '.svg',
      message: getMessage(sentensesCount),
      name: getRandomValue(NAMES)
    };

    comments.push(commentsItem);
  }

  return comments;
};

var generateInfo = function (count) {
  var info = [];

  for (var i = 1; i <= count; i++) {
    var imgItem = {
      url: 'photos/' + i + '.jpg',
      description: getRandomValue(DESCRIPTION_PHRASES),
      likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
      comments: getComments()
    };

    info.push(imgItem);
  }

  return info;
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

var renderPicture = function (imageData, template) {
  var imageElement = template.cloneNode(true);

  imageElement.querySelector('.picture__img').src = imageData.url;
  imageElement.querySelector('.picture__likes').textContent = imageData.likes;
  imageElement.querySelector('.picture__comments').textContent = imageData.comments.length;

  return imageElement;
};

var imagesData = getShuffledArray(generateInfo(IMAGES_COUNT));
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

var createFragment = function (data, template) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < data.length; i++) {
    fragment.appendChild(renderPicture(data[i], template));
  }

  return fragment;
};

document.querySelector('.pictures').appendChild(createFragment(imagesData, pictureTemplate));

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

var renderModalWindowContent = function (modal, data) {
  var bigPicture = modal.querySelector('.big-picture__img img');
  var likesCount = modal.querySelector('.likes-count');
  var commentsCount = modal.querySelector('.comments-count');
  var commentsContainer = modal.querySelector('.social__comments');

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

var showModalPicture = function (data) {
  renderModalWindowContent(modalPictureWindow, data);

  modalPictureWindow.querySelector('.social__comment-count').classList.add('hidden');
  modalPictureWindow.querySelector('.comments-loader').classList.add('hidden');

  setBodyStatus(true);

  modalPictureWindow.classList.remove('hidden');
};

var pictures = document.querySelector('.pictures');

pictures.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('picture__img')) {
    showModalPicture(imagesData[0]); // Это пока что, т.к. линтер ругается на отсутствие использования showModalPicture
  }
});

var uploadPictureField = document.querySelector('#upload-file');

var modalUploadWindow = document.querySelector('.img-upload__overlay');
var uploadWindowCloseButton = modalUploadWindow.querySelector('#upload-cancel');
var uploadedPicturePreview = modalUploadWindow.querySelector('.img-upload__preview img');

var scaleControls = modalUploadWindow.querySelector('.img-upload__scale');
var scaleSmallerButton = scaleControls.querySelector('.scale__control--smaller');
var scaleBiggerButon = scaleControls.querySelector('.scale__control--bigger');
var scaleField = scaleControls.querySelector('.scale__control--value');

var effectsList = modalUploadWindow.querySelector('.effects__list');
var effectLevelSlider = modalUploadWindow.querySelector('.effect-level');
var effectLevelLever = effectLevelSlider.querySelector('.effect-level__pin');
var effectLevelBar = effectLevelSlider.querySelector('.effect-level__line');
var effectLevelDepth = effectLevelSlider.querySelector('.effect-level__depth');
var effectLevelField = effectLevelSlider.querySelector('.effect-level__value');

var tagsInputField = modalUploadWindow.querySelector('.text__hashtags');

var getPictureStyleAtt = function (style, type) {
  var currentStyle = uploadedPicturePreview.getAttribute('style');

  if (currentStyle) {
    var currentSplittedStyle = deleteArrayElements(currentStyle.split(';'), '');
    var newStyle = [];

    for (var i = 0; i < currentSplittedStyle.length; i++) {
      if (!currentSplittedStyle[i].includes(type)) {
        newStyle.push(currentSplittedStyle[i] + ';');
      }
    }

    newStyle.push(style + ';');

    return newStyle.join('');
  }

  return style;
};

/* tags */

var deleteArrayElements = function (arr, valueToDelete) {
  var cleanArr = [];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] !== valueToDelete) {
      cleanArr.push(arr[i]);
    }
  }

  return cleanArr;
};

var getTagsValidityMessage = function (tags) {
  var splittedTags = deleteArrayElements(tags.split(' '), '');
  var wrongSymbolsRegExp = /\W/;
  var acceptedTags = [];

  if (splittedTags.length > MAX_TAGS_COUNT) {
    return 'Вы указали слишком много хэштегов (максимум - ' + MAX_TAGS_COUNT + ')';
  }

  for (var i = 0; i < splittedTags.length; i++) {
    var tag = splittedTags[i].toLowerCase();

    if (tag.charAt(0) !== TAG_SYMBOL) {
      return 'Это не хэштег!';
    } else if (tag.length === 1) {
      return 'Хэштег не может состоять только из «' + TAG_SYMBOL + '»';
    } else {
      var tagText = tag.slice(1);
      if (wrongSymbolsRegExp.test(tagText)) {
        return 'Хэштег ' + tag + ' введен некорректно';
      }
    }

    if (splittedTags[i].length > TAG_MAX_LENGTH) {
      return 'Хэштег ' + tag + ' слишком длинный (лишние ' + (tag.length - TAG_MAX_LENGTH) + ' симв.)';
    }

    if (acceptedTags.indexOf(tag) !== -1) {
      return 'Хэштег ' + tag + ' уже введен';
    } else {
      acceptedTags.push(tag);
    }
  }

  return '';
};

var onTagsInput = function () {
  var tags = tagsInputField.value;

  tagsInputField.setCustomValidity(getTagsValidityMessage(tags));
  tagsInputField.reportValidity();
};

/* move */

var fadePictureEffect = function (value) {
  var effectClass = (uploadedPicturePreview.className).split('--')[1];

  switch (effectClass) {
    case effectNames.CHROME:
      return 'filter: grayscale(' + value / 100 + ')';
    case effectNames.SEPIA:
      return 'filter: sepia(' + value / 100 + ')';
    case effectNames.MARVIN:
      return 'filter: invert(' + value + '%)';
    case effectNames.PHOBOS:
      return 'filter: blur(' + Math.floor(3 * value / 100) + 'px)';
    case effectNames.HEAT:
      return 'filter: brightness(' + (Math.floor(value / 50) + 1) + ')';
  }

  return '';
};

var moveEffectLevelLever = function (offset) {
  var effectLevelBarWidth = effectLevelBar.offsetWidth;

  if (offset === effectLevelBarWidth) {
    var newEffectValue = DEFAULT_EFFECT_VALUE;
  } else {
    newEffectValue = Math.round((effectLevelDepth.offsetWidth - offset) * 100 / effectLevelBarWidth);

    if (newEffectValue < 0) {
      newEffectValue = 0;
    } else if (newEffectValue > DEFAULT_EFFECT_VALUE) {
      newEffectValue = DEFAULT_EFFECT_VALUE;
    }
  }

  effectLevelDepth.style.width = newEffectValue + '%';
  effectLevelLever.style.left = newEffectValue + '%';

  effectLevelField.value = newEffectValue;

  uploadedPicturePreview.style = getPictureStyleAtt(fadePictureEffect(newEffectValue), 'filter');
};

var onEffectLevelLeverPress = function (evt) {
  var startOffset = evt.clientX;

  var onEffectLevelLeverMove = function (evtMove) {
    var newOffset = evtMove.clientX;

    moveEffectLevelLever(startOffset - newOffset);

    startOffset = newOffset;
  };

  var onEffectLevelLeverRelease = function () {
    document.removeEventListener('mousemove', onEffectLevelLeverMove);
    document.removeEventListener('mouseup', onEffectLevelLeverRelease);
  };

  document.addEventListener('mousemove', onEffectLevelLeverMove);
  document.addEventListener('mouseup', onEffectLevelLeverRelease);
};

/* effects */

var applyPictureEffect = function (effectName) {
  var effectClass = 'effects__preview--' + effectName;

  uploadedPicturePreview.className = '';
  uploadedPicturePreview.classList.add(effectClass);

  if (effectName === DEFAULT_EFFECT) {
    effectLevelSlider.classList.add('hidden');
  } else {
    effectLevelSlider.classList.remove('hidden');
  }

  moveEffectLevelLever(effectLevelBar.offsetWidth);
};

var onEffectPress = function (evt) {
  var effectsItemID = evt.target.id;

  if (effectsItemID) {
    applyPictureEffect(effectsItemID.split('-')[1]);
  }
};

/* scale */

var changePictureScale = function (increase) {
  var scale = (scaleField.value).replace(/\D+/, '') * 1;

  if (increase) {
    if (scale < MAX_SCALE) {
      scale += SCALE_STEP;
    }
  } else {
    if (scale > MIN_SCALE) {
      scale -= SCALE_STEP;
    }
  }

  uploadedPicturePreview.style = getPictureStyleAtt('transform: scale(' + scale * 0.01 + ')', 'transform');
  scaleField.value = scale + '%';
};

var onScalePress = function (evt) {
  if (evt.target === scaleSmallerButton) {
    changePictureScale();
  }

  if (evt.target === scaleBiggerButon) {
    changePictureScale(true);
  }
};

/* upload */

var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape' && evt.target !== tagsInputField) {
    evt.preventDefault();

    closeUploadWindow();
  }
};

var openUploadWindow = function () {
  modalUploadWindow.classList.remove('hidden');

  setBodyStatus(true);
  applyPictureEffect(DEFAULT_EFFECT);

  document.addEventListener('keydown', onPopupEscPress);
  scaleControls.addEventListener('click', onScalePress);
  effectsList.addEventListener('click', onEffectPress);
  tagsInputField.addEventListener('input', onTagsInput);
  effectLevelLever.addEventListener('mousedown', onEffectLevelLeverPress);
};

var closeUploadWindow = function () {
  modalUploadWindow.classList.add('hidden');
  uploadPictureField.value = '';

  setBodyStatus();

  document.removeEventListener('keydown', onPopupEscPress);
  scaleControls.removeEventListener('click', onScalePress);
  effectsList.removeEventListener('click', onEffectPress);
  effectLevelLever.removeEventListener('mousedown', onEffectLevelLeverPress);
};

var onUploadPictureFieldChange = function () {
  openUploadWindow();
};

uploadPictureField.addEventListener('change', onUploadPictureFieldChange);

var onUploadWindowClosePress = function () {
  closeUploadWindow();
};

uploadWindowCloseButton.addEventListener('click', onUploadWindowClosePress);
