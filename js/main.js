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
    // тут пытался через деструктуризацию сделать, но линтер не пропускает
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
