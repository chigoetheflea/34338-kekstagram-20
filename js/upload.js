'use strict';

(function () {
  var uploadPictureField = document.querySelector('#upload-file');

  var uploadForm = document.querySelector('.img-upload__form');
  var uploadedPicturePreview = uploadForm.querySelector('.img-upload__preview img');

  var uploadWindow = uploadForm.querySelector('.img-upload__overlay');
  var uploadWindowCloseButton = uploadWindow.querySelector('.img-upload__cancel');

  var scaleControls = uploadWindow.querySelector('.img-upload__scale');
  var scaleField = scaleControls.querySelector('.scale__control--value');

  var effectsList = uploadWindow.querySelector('.effects__list');
  var effectLevelField = uploadWindow.querySelector('.effect-level__value');
  var effectLevelLever = uploadWindow.querySelector('.effect-level__pin');
  var effectLevelSlider = uploadWindow.querySelector('.effect-level');
  var defaultEffect = effectsList.querySelector('#effect-none');

  var tagsInputField = uploadWindow.querySelector('.text__hashtags');
  var descriptionInputField = uploadWindow.querySelector('.text__description');

  var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  var mainElement = document.querySelector('main');
  var successWindowClose = null;
  var errorWindowClose = null;

  var resetUploadForm = function () {
    uploadedPicturePreview.className = '';
    uploadedPicturePreview.setAttribute('style', '');

    tagsInputField.value = '';
    descriptionInputField.value = '';
    effectLevelField.value = '';
    scaleField.value = window.effects.defaultScaleValue;
    defaultEffect.checked = true;
  };

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
    uploadForm.addEventListener('submit', onUploadFormSubmit);
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
    uploadForm.removeEventListener('submit', onUploadFormSubmit);

    resetUploadForm();
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

  var createResultWindow = function (template) {
    var resultWindow = template.cloneNode(true);
    resultWindow.classList.add('upload-result');

    return resultWindow;
  };

  var onResultWindowCloseClick = function () {
    closeResultWindow();
  };

  var closeResultWindow = function () {
    document.querySelector('.upload-result').remove();

    if (successWindowClose) {
      successWindowClose.removeEventListener('click', onResultWindowCloseClick);
    }

    if (errorWindowClose) {
      errorWindowClose.removeEventListener('click', onResultWindowCloseClick);
    }

    document.removeEventListener('keydown', onResultWindowEscPress);
    document.removeEventListener('click', onOutsideResultWindowClick);
  };

  var onResultWindowEscPress = function (evt) {
    window.utility.isSimpleEscEvent(evt, closeResultWindow);
  };

  var onOutsideResultWindowClick = function (evt) {
    var isResultWindow = evt.target.classList.contains('upload-result');

    if (isResultWindow) {
      closeResultWindow();
    }
  };

  var addResultWindowListeners = function (resultWindow) {
    resultWindow.addEventListener('click', onResultWindowCloseClick);

    document.addEventListener('keydown', onResultWindowEscPress);
    document.addEventListener('click', onOutsideResultWindowClick);
  };

  var openSuccessResultWindow = function () {
    var successWindow = createResultWindow(successMessageTemplate);
    successWindowClose = successWindow.querySelector('.success__button');

    mainElement.appendChild(successWindow);

    addResultWindowListeners(successWindowClose);
  };

  var openErrorResultWindow = function () {
    var errorWindow = createResultWindow(errorMessageTemplate);
    errorWindowClose = errorWindow.querySelector('.error__button');

    mainElement.appendChild(errorWindow);

    addResultWindowListeners(errorWindowClose);
  };

  var onUploadFormSubmit = function (evt) {
    evt.preventDefault();

    window.backend.save(new FormData(uploadForm), openSuccessResultWindow, openErrorResultWindow);

    closeUploadWindow();
  };
})();
