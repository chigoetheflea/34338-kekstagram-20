'use strict';

(function () {
  var DEFAULT_EFFECT = 'none';
  var MIN_SCALE = 25;
  var MAX_SCALE = 100;
  var SCALE_STEP = 25;
  var DEFAULT_EFFECT_VALUE = 100;

  var EffectName = {
    CHROME: 'chrome',
    SEPIA: 'sepia',
    MARVIN: 'marvin',
    PHOBOS: 'phobos',
    HEAT: 'heat'
  };

  var uploadWindow = document.querySelector('.img-upload__overlay');
  var uploadedPicturePreview = uploadWindow.querySelector('.img-upload__preview img');

  var scaleControls = uploadWindow.querySelector('.img-upload__scale');
  var scaleSmallerButton = scaleControls.querySelector('.scale__control--smaller');
  var scaleBiggerButon = scaleControls.querySelector('.scale__control--bigger');
  var scaleField = scaleControls.querySelector('.scale__control--value');

  var effectLevelSlider = uploadWindow.querySelector('.effect-level');
  var effectLevelLever = effectLevelSlider.querySelector('.effect-level__pin');
  var effectLevelBar = effectLevelSlider.querySelector('.effect-level__line');
  var effectLevelDepth = effectLevelSlider.querySelector('.effect-level__depth');
  var effectLevelField = effectLevelSlider.querySelector('.effect-level__value');

  var getPictureStyleAtt = function (style, type) {
    var currentStyle = uploadedPicturePreview.getAttribute('style');

    if (currentStyle) {
      var currentSplittedStyle = window.support.deleteArrayElements(currentStyle.split(';'), '');
      var newStyle = [];

      for (var i = 0; i < currentSplittedStyle.length; i++) {
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

  var applyPictureEffect = function (effectName) {
    var effectClass = 'effects__preview--' + effectName;
    var isDefaultEffect = !effectName || effectName === DEFAULT_EFFECT;

    uploadedPicturePreview.className = '';
    uploadedPicturePreview.classList.add(effectClass);

    if (isDefaultEffect) {
      effectLevelSlider.classList.add('hidden');
    } else {
      effectLevelSlider.classList.remove('hidden');
    }

    moveEffectLevelLever(effectLevelBar.offsetWidth);
  };

  window.effects = {
    onEffectLevelLeverClick: function (evt) {
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
    },
    onEffectClick: function (evt) {
      var effectsItemID = evt.target.id;

      if (effectsItemID) {
        applyPictureEffect(effectsItemID.split('-')[1]);
      }
    },
    onScaleClick: function (evt) {
      var isSmallerButton = evt.target === scaleSmallerButton;
      var isBiggerButton = evt.target === scaleBiggerButon;

      if (isSmallerButton) {
        changePictureScale();
      }

      if (isBiggerButton) {
        changePictureScale(true);
      }
    }
  };
})();