'use strict';

(function () {
  var TAG_MAX_LENGTH = 20;
  var MAX_TAGS_COUNT = 5;
  var TAG_SYMBOL = '#';
  var MAX_DESCRIPTION_LENGTH = 140;
  var MAX_DESRIPTION_THRESHOLD = 125;

  var isDescriptionEndsSoon = function (length) {
    return length > MAX_DESRIPTION_THRESHOLD && length < MAX_DESCRIPTION_LENGTH;
  };

  window.validity = {
    getTagsValidityMessage: function (tags) {
      var splittedTags = window.support.deleteArrayElements(tags.split(' '), '');
      var wrongSymbolsRegExp = /\W/;
      var acceptedTags = [];
      var isMaxTagsCount = splittedTags.length > MAX_TAGS_COUNT;

      if (isMaxTagsCount) {
        return 'Вы указали слишком много хэштегов (макс. ' + MAX_TAGS_COUNT + ')';
      }

      for (var i = 0; i < splittedTags.length; i++) {
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
    },
    getDescriptionValidityMessage: function (description) {
      if (isDescriptionEndsSoon(description.length)) {
        return 'Вы можете добавить в описанисе еще ' + (MAX_DESCRIPTION_LENGTH - description.length) + ' симв.';
      }

      return '';
    }
  };
})();
