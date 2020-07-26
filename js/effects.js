'use strict';

(function () {
  var DEFAULT_EFFECT = 'none';
  var MIN_SCALE = 25;
  var MAX_SCALE = 100;
  var DEFAULT_SCALE_VALUE = '100%';
  var SCALE_STEP = 25;

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
  var scaleBiggerButton = scaleControls.querySelector('.scale__control--bigger');
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
      var newStyles = [];

      currentSplittedStyle.forEach(function (element) {
        var isCurrentStyleIncludes = element.includes(type);

        if (!isCurrentStyleIncludes) {
          newStyles.push(element + ';');
        }
      });

      newStyles.push(style + ';');

      return newStyles.join('');
    }

    return style;
  };

  var fadePictureEffect = function (value) {
    var effectClass = (uploadedPicturePreview.className).split('--')[1];

    switch (effectClass) {
      case EffectName.CHROME:
        return 'filter: grayscale(' + value + ')';
      case EffectName.SEPIA:
        return 'filter: sepia(' + value + ')';
      case EffectName.MARVIN:
        return 'filter: invert(' + 100 * value + '%)';
      case EffectName.PHOBOS:
        return 'filter: blur(' + 3 * value + 'px)';
      case EffectName.HEAT:
        return 'filter: brightness(' + (2 * value + 1) + ')';
    }

    return '';
  };

  var moveEffectLevelLever = function (newOffset, rightThreshold) {
    var isNewValueLessMin = newOffset < 0;
    var isNewValueMoreMax = newOffset > rightThreshold;
    var newEffectValue = 0;

    if (!rightThreshold) {
      rightThreshold = newOffset;
    }

    if (isNewValueLessMin) {
      newOffset = 0;
    }

    if (isNewValueMoreMax) {
      newOffset = rightThreshold;
    }

    newOffset = Math.round(newOffset);

    effectLevelDepth.style.width = newOffset + 'px';
    effectLevelLever.style.left = newOffset + 'px';

    newEffectValue = newOffset / rightThreshold;

    effectLevelField.setAttribute('value', Math.round(newEffectValue * 100));

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

    scaleField.setAttribute('value', scale + '%');
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

  var onEffectLevelLeverClick = function (leftTreshold, evt) {
    var effectLevelLeverLeft = effectLevelLever.getBoundingClientRect().left;
    var rightThreshold = effectLevelBar.offsetWidth;

    var startOffset = evt.pageX - effectLevelLeverLeft;

    var onEffectLevelLeverMove = function (evtMove) {
      var newOffset = evtMove.pageX - leftTreshold - startOffset;

      moveEffectLevelLever(newOffset, rightThreshold);
    };

    var onEffectLevelLeverRelease = function () {
      document.removeEventListener('mousemove', onEffectLevelLeverMove);
      document.removeEventListener('mouseup', onEffectLevelLeverRelease);
    };

    document.addEventListener('mousemove', onEffectLevelLeverMove);
    document.addEventListener('mouseup', onEffectLevelLeverRelease);
  };

  var onEffectClick = function (evt) {
    var effectsItemID = evt.target.id;

    if (effectsItemID) {
      applyPictureEffect(effectsItemID.split('-')[1]);
    }
  };

  var onScaleClick = function (evt) {
    var isSmallerButton = evt.target === scaleSmallerButton;
    var isBiggerButton = evt.target === scaleBiggerButton;

    if (isSmallerButton) {
      changePictureScale();
    }

    if (isBiggerButton) {
      changePictureScale(true);
    }
  };

  window.effects = {
    onEffectLevelLeverClick: onEffectLevelLeverClick,
    onEffectClick: onEffectClick,
    onScaleClick: onScaleClick,
    defaultScaleValue: DEFAULT_SCALE_VALUE
  };
})();
