'use strict';

(function () {
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

  var COMMENTS_COUNT = 5;
  var MIN_COMMENT_SENTENCES = 1;
  var MAX_COMMENT_SENTENCES = 2;
  var MIN_AVATAR_NUMBER = 1;
  var MAX_AVATAR_NUMBER = 6;
  var MIN_LIKES = 15;
  var MAX_LIKES = 200;

  var getMessage = function (count) {
    var firstSentence = window.support.getRandomValue(COMMENT_MESSAGES);
    var isMaxCommentSentenses = count === MAX_COMMENT_SENTENCES;

    if (isMaxCommentSentenses) {
      do {
        var secondSentence = window.support.getRandomValue(COMMENT_MESSAGES);
      } while (secondSentence === firstSentence);

      firstSentence = firstSentence + ' ' + secondSentence;
    }

    return firstSentence;
  };

  var getComments = function () {
    var comments = [];
    var commentsRandomCount = window.support.getRandomNumber(0, COMMENTS_COUNT);
    var sentensesCount = Math.random() > 0.5 ? MAX_COMMENT_SENTENCES : MIN_COMMENT_SENTENCES;

    for (var i = 0; i < commentsRandomCount; i++) {
      var commentsItem = {
        avatar: 'img/avatar-' + window.support.getRandomNumber(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER) + '.svg',
        message: getMessage(sentensesCount),
        name: window.support.getRandomValue(NAMES)
      };

      comments.push(commentsItem);
    }

    return comments;
  };

  window.generateInfo = function (count) {
    var pictures = [];

    for (var i = 1; i <= count; i++) {
      var pictureItem = {
        url: 'photos/' + i + '.jpg',
        description: window.support.getRandomValue(DESCRIPTION_PHRASES),
        likes: window.support.getRandomNumber(MIN_LIKES, MAX_LIKES),
        comments: getComments()
      };

      pictures.push(pictureItem);
    }

    return pictures;
  };
})();
