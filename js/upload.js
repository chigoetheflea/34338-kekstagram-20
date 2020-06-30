'use strict';

(function () {
  var uploadPictureField = document.querySelector('#upload-file');

  var uploadWindow = document.querySelector('.img-upload__overlay');
  var uploadWindowCloseButton = uploadWindow.querySelector('.img-upload__cancel');
  var scaleControls = uploadWindow.querySelector('.img-upload__scale');
  var effectsList = uploadWindow.querySelector('.effects__list');
  var tagsInputField = uploadWindow.querySelector('.text__hashtags');
  var descriptionInputField = uploadWindow.querySelector('.text__description');
  var effectLevelLever = uploadWindow.querySelector('.effect-level__pin');
  var effectLevelSlider = uploadWindow.querySelector('.effect-level');

  var onUploadWindowEscPress = function (evt) {
    window.utility.isEscEvent(evt, closeUploadWindow);
  };

  var openUploadWindow = function () {
    uploadWindow.classList.remove('hidden');

    window.support.setBodyStatus(true);
    effectLevelSlider.classList.add('hidden');

    document.addEventListener('keydown', onUploadWindowEscPress);
    scaleControls.addEventListener('click', window.effects.onScaleClick);
    tagsInputField.addEventListener('input', onTagsInput);
    descriptionInputField.addEventListener('input', onDescriptionInput);
    effectsList.addEventListener('click', window.effects.onEffectClick);
    effectLevelLever.addEventListener('mousedown', window.effects.onEffectLevelLeverClick);
    uploadWindowCloseButton.addEventListener('click', onUploadWindowCloseClick);
  };

  var closeUploadWindow = function () {
    uploadWindow.classList.add('hidden');
    uploadPictureField.value = '';

    window.support.setBodyStatus();

    document.removeEventListener('keydown', onUploadWindowEscPress);
    scaleControls.removeEventListener('click', window.effects.onScaleClick);
    tagsInputField.removeEventListener('input', onTagsInput);
    descriptionInputField.removeEventListener('input', onDescriptionInput);
    effectsList.removeEventListener('click', window.effects.onEffectClick);
    effectLevelLever.removeEventListener('mousedown', window.effects.onEffectLevelLeverClick);
    uploadWindowCloseButton.removeEventListener('click', onUploadWindowCloseClick);
  };

  var onUploadPictureFieldChange = function () {
    openUploadWindow();
  };

  uploadPictureField.addEventListener('change', onUploadPictureFieldChange);

  var onUploadWindowCloseClick = function () {
    closeUploadWindow();
  };

  var onTagsInput = function () {
    var tags = tagsInputField.value;

    tagsInputField.setCustomValidity(window.validity.getTagsValidityMessage(tags));
    tagsInputField.reportValidity();
  };

  var onDescriptionInput = function () {
    var description = descriptionInputField.value;

    descriptionInputField.setCustomValidity(window.validity.getDescriptionValidityMessage(description));
    descriptionInputField.reportValidity();
  };
})();
