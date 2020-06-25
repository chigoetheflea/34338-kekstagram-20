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
var MIN_COMMENT_SENTENSES = 1;
var MAX_COMMENT_SENTENSES = 2;
var MAX_DESCRIPTION_LENGTH = 140;
var MAX_DESRIPTION_THRESHOLD = 125;

var EffectName = {
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat'
};

var tagBody = document.querySelector('body');

var bigPictureWindow = document.querySelector('.big-picture');
var bigPicture = bigPictureWindow.querySelector('.big-picture__img img');
var likesCount = bigPictureWindow.querySelector('.likes-count');
var commentsCount = bigPictureWindow.querySelector('.comments-count');
var commentsContainer = bigPictureWindow.querySelector('.social__comments');
var bigPictureCancelButton = bigPictureWindow.querySelector('.big-picture__cancel');

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
  var isMaxCommentSentenses = count === MAX_COMMENT_SENTENSES;

  if (isMaxCommentSentenses) {
    do {
      var secondSentence = getRandomValue(COMMENT_MESSAGES);
    } while (secondSentence === firstSentence);

    firstSentence = firstSentence + ' ' + secondSentence;
  }

  return firstSentence;
};

var getComments = function () {
  var comments = [];
  var commentsRandomCount = getRandomNumber(0, COMMENTS_COUNT);
  var sentensesCount = Math.random() > 0.5 ? MAX_COMMENT_SENTENSES : MIN_COMMENT_SENTENSES;

  for (var i = 0; i < commentsRandomCount; i++) {
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

var pictures = document.querySelectorAll('.picture');

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

var showBigPicture = function (data) {
  renderBigPicturelContent(data);

  bigPictureWindow.querySelector('.social__comment-count').classList.add('hidden');
  bigPictureWindow.querySelector('.comments-loader').classList.add('hidden');

  setBodyStatus(true);

  bigPictureWindow.classList.remove('hidden');
};

/* big picture opening */

var closePictureWindow = function () {
  bigPictureWindow.classList.add('hidden');

  setBodyStatus();

  document.removeEventListener('keydown', onPictureWindowEscPress);
  bigPictureCancelButton.removeEventListener('click', onPictureWindowCancelPress);
};

var onPictureWindowEscPress = function (evt) {
  var isEscKey = evt.key === 'Escape';

  if (isEscKey) {
    evt.preventDefault();

    closePictureWindow();
  }
};

var onPictureWindowCancelPress = function () {
  closePictureWindow();
};

var openPictureWindow = function (data) {
  showBigPicture(data);

  setBodyStatus(true);

  document.addEventListener('keydown', onPictureWindowEscPress);
  bigPictureCancelButton.addEventListener('click', onPictureWindowCancelPress);
};

for (var i = 0; i < pictures.length; i++) {
  pictures[i].addEventListener('click', openPictureWindow.bind(null, imagesData[i]));
}

/* big picture opening */

var uploadPictureField = document.querySelector('#upload-file');

var uploadWindow = document.querySelector('.img-upload__overlay');
var uploadWindowCloseButton = uploadWindow.querySelector('#upload-cancel');
var uploadedPicturePreview = uploadWindow.querySelector('.img-upload__preview img');

var scaleControls = uploadWindow.querySelector('.img-upload__scale');
var scaleSmallerButton = scaleControls.querySelector('.scale__control--smaller');
var scaleBiggerButon = scaleControls.querySelector('.scale__control--bigger');
var scaleField = scaleControls.querySelector('.scale__control--value');

var effectsList = uploadWindow.querySelector('.effects__list');
var effectLevelSlider = uploadWindow.querySelector('.effect-level');
var effectLevelLever = effectLevelSlider.querySelector('.effect-level__pin');
var effectLevelBar = effectLevelSlider.querySelector('.effect-level__line');
var effectLevelDepth = effectLevelSlider.querySelector('.effect-level__depth');
var effectLevelField = effectLevelSlider.querySelector('.effect-level__value');

var tagsInputField = uploadWindow.querySelector('.text__hashtags');
var descriptionInputField = uploadWindow.querySelector('.text__description');

var getPictureStyleAtt = function (style, type) {
  var currentStyle = uploadedPicturePreview.getAttribute('style');

  if (currentStyle) {
    var currentSplittedStyle = deleteArrayElements(currentStyle.split(';'), '');
    var newStyle = [];

    for (i = 0; i < currentSplittedStyle.length; i++) {
      var isCurrentStyleIncludes = currentSplittedStyle[i].includes(type);

      if (!isCurrentStyleIncludes) {
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

  for (i = 0; i < arr.length; i++) {
    var isValueToDelete = arr[i] === valueToDelete;

    if (!isValueToDelete) {
      cleanArr.push(arr[i]);
    }
  }

  return cleanArr;
};

var getTagsValidityMessage = function (tags) {
  var splittedTags = deleteArrayElements(tags.split(' '), '');
  var wrongSymbolsRegExp = /\W/;
  var acceptedTags = [];
  var isMaxTagsCount = splittedTags.length > MAX_TAGS_COUNT;

  if (isMaxTagsCount) {
    return 'Вы указали слишком много хэштегов (макс. ' + MAX_TAGS_COUNT + ')';
  }

  for (i = 0; i < splittedTags.length; i++) {
    var tag = splittedTags[i].toLowerCase();
    var tagText = tag.slice(1);

    var isHashTag = tag.charAt(0) === TAG_SYMBOL;
    var isTagTooShort = tag.length === 1;
    var isTagTooLong = splittedTags[i].length > TAG_MAX_LENGTH;
    var isTagExists = acceptedTags.indexOf(tag) !== -1;
    var isWrongTag = wrongSymbolsRegExp.test(tagText);

    if (!isHashTag) {
      return 'Это не хэштег!';
    } else if (isTagTooShort) {
      return 'Хэштег не может состоять только из «' + TAG_SYMBOL + '»';
    } else if (isWrongTag) {
      return 'Хэштег ' + tag + ' введен некорректно';
    }

    if (isTagTooLong) {
      return 'Хэштег ' + tag + ' слишком длинный (лишние ' + (tag.length - TAG_MAX_LENGTH) + ' симв.)';
    }

    if (isTagExists) {
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

/* description */

var isDescriptionEndSoon = function (length) {
  return length > MAX_DESRIPTION_THRESHOLD && length < MAX_DESCRIPTION_LENGTH;
};

var getDescriptionValidityMessage = function (description) {
  if (isDescriptionEndSoon(description.length)) {
    return 'Вы можете добавить в описанисе еще ' + (MAX_DESCRIPTION_LENGTH - description.length) + ' симв.';
  }

  return '';
};

var onDescriptionInput = function () {
  var description = descriptionInputField.value;

  descriptionInputField.setCustomValidity(getDescriptionValidityMessage(description));
  descriptionInputField.reportValidity();
};

/* move */

var fadePictureEffect = function (value) {
  var effectClass = (uploadedPicturePreview.className).split('--')[1];

  switch (effectClass) {
    case EffectName.CHROME:
      return 'filter: grayscale(' + value / 100 + ')';
    case EffectName.SEPIA:
      return 'filter: sepia(' + value / 100 + ')';
    case EffectName.MARVIN:
      return 'filter: invert(' + value + '%)';
    case EffectName.PHOBOS:
      return 'filter: blur(' + Math.floor(3 * value / 100) + 'px)';
    case EffectName.HEAT:
      return 'filter: brightness(' + (Math.floor(value / 50) + 1) + ')';
  }

  return '';
};

var moveEffectLevelLever = function (offset) {
  var effectLevelBarWidth = effectLevelBar.offsetWidth;
  var isFullWidth = offset === effectLevelBarWidth;

  if (isFullWidth) {
    var newEffectValue = DEFAULT_EFFECT_VALUE;
  } else {
    newEffectValue = Math.round((effectLevelDepth.offsetWidth - offset) * 100 / effectLevelBarWidth);
    var isNewValueLessMin = newEffectValue < 0;
    var isNewValueMoreMax = newEffectValue > DEFAULT_EFFECT_VALUE;

    if (isNewValueLessMin) {
      newEffectValue = 0;
    } else if (isNewValueMoreMax) {
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
  var isDefaultEffect = effectName === DEFAULT_EFFECT;

  uploadedPicturePreview.className = '';
  uploadedPicturePreview.classList.add(effectClass);

  if (isDefaultEffect) {
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
  var isScaleLessMax = scale < MAX_SCALE;
  var isScaleMoreMin = scale > MIN_SCALE;

  if (increase) {
    if (isScaleLessMax) {
      scale += SCALE_STEP;
    }
  } else {
    if (isScaleMoreMin) {
      scale -= SCALE_STEP;
    }
  }

  uploadedPicturePreview.style = getPictureStyleAtt('transform: scale(' + scale * 0.01 + ')', 'transform');
  scaleField.value = scale + '%';
};

var onScalePress = function (evt) {
  var isSmallerButton = evt.target === scaleSmallerButton;
  var isBiggerButton = evt.target === scaleBiggerButon;

  if (isSmallerButton) {
    changePictureScale();
  }

  if (isBiggerButton) {
    changePictureScale(true);
  }
};

/* upload */

var isEscNotInput = function (evt) {
  return evt.key === 'Escape' && evt.target !== tagsInputField && evt.target !== descriptionInputField;
};

var onUploadWindowEscPress = function (evt) {
  if (isEscNotInput(evt)) {
    evt.preventDefault();

    closeUploadWindow();
  }
};

var openUploadWindow = function () {
  uploadWindow.classList.remove('hidden');

  setBodyStatus(true);
  applyPictureEffect(DEFAULT_EFFECT);

  document.addEventListener('keydown', onUploadWindowEscPress);
  scaleControls.addEventListener('click', onScalePress);
  tagsInputField.addEventListener('input', onTagsInput);
  descriptionInputField.addEventListener('input', onDescriptionInput);
  effectsList.addEventListener('click', onEffectPress);
  effectLevelLever.addEventListener('mousedown', onEffectLevelLeverPress);
};

var closeUploadWindow = function () {
  uploadWindow.classList.add('hidden');
  uploadPictureField.value = '';

  setBodyStatus();

  document.removeEventListener('keydown', onUploadWindowEscPress);
  scaleControls.removeEventListener('click', onScalePress);
  tagsInputField.removeEventListener('input', onTagsInput);
  descriptionInputField.removeEventListener('input', onDescriptionInput);
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
