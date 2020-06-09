'use strict';

var NAMES = ['Анна', 'Дмитрий', 'Елена', 'Андрей', 'Светлана', 'Владимир', 'Яна', 'Максим', 'Алиса', 'Антон', 'Марина', 'Сергей', 'Пельмешка'];
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

var getRandomValue = function (arr) {
  var randomElement = Math.floor(Math.random() * arr.length);

  return arr[randomElement];
};

var getRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var getImageNumbers = function (number) {
  var orderedArr = [];
  var shuffledArr = [];

  for (var i = 0; i < number; i++) {
    orderedArr.push(i + 1);
  }

  while (orderedArr.length) {
    var randomIndex = getRandomNumber(0, orderedArr.length - 1);
    var randomElement = orderedArr.splice(randomIndex, 1);

    shuffledArr.push(randomElement[0]);
  }

  return shuffledArr;
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
      avatar: 'img/avatar-' + getRandomNumber(1, 6) + '.svg',
      message: getMessage(sentensesCount),
      name: getRandomValue(NAMES)
    };

    comments.push(commentsItem);
  }

  return comments;
};

var generateInfo = function (count) {
  var info = [];
  var imgNumbers = getImageNumbers(count);

  for (var i = 0; i < count; i++) {
    var imgItem = {
      url: 'photos/' + imgNumbers[i] + '.jpg',
      description: getRandomValue(DESCRIPTION_PHRASES),
      likes: getRandomNumber(15, 200),
      comments: getComments()
    };

    info.push(imgItem);
  }

  return info;
};

var renderImage = function (imageData, template) {
  var imageElement = template.cloneNode(true);

  imageElement.querySelector('.picture__img').src = imageData.url;
  imageElement.querySelector('.picture__likes').textContent = imageData.likes;
  imageElement.querySelector('.picture__comments').textContent = imageData.comments.length;

  return imageElement;
};

var imagesData = generateInfo(IMAGES_COUNT);
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

var createFragment = function (data, template) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < data.length; i++) {
    fragment.appendChild(renderImage(data[i], template));
  }

  return fragment;
};

document.querySelector('.pictures').appendChild(createFragment(imagesData, pictureTemplate));
