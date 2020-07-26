'use strict';

(function () {
  var TIMEOUT = 10000;
  var TIMEOUT_UNIT = 'мс';
  var RESPONSE_TYPE = 'json';

  var StatusCode = {
    OK: 200,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
  };

  var Url = {
    IN: 'https://javascript.pages.academy/kekstagram/data',
    OUT: 'https://javascript.pages.academy/kekstagram'
  };

  var ErrorMessage = {
    NOT_FOUND: 'Изображения не найдены',
    SERVER_ERROR: 'Ошибка сервера',
    CONNECTION_LOST: 'Произошла ошибка соединения',
    TIMEOUT: 'Запрос не успел выполниться за ',
    COMMON_ERROR: 'Статус ответа: '
  };

  var getErrorMessage = function (status, text) {
    switch (status) {
      case StatusCode.NOT_FOUND:
        return ErrorMessage.NOT_FOUND;

      case StatusCode.SERVER_ERROR:
        return ErrorMessage.SERVER_ERROR;
    }

    return ErrorMessage.COMMON_ERROR + status + ' ' + text;
  };

  var isLoad = function (xhr) {
    return xhr.status === StatusCode.OK;
  };

  var onDataLoad = function (xhr, onLoad, onError) {
    if (isLoad(xhr)) {
      onLoad(xhr.response);
    } else {
      onError(getErrorMessage(xhr.status, xhr.statusText));
    }
  };

  var onRequestErrorOccures = function (onError) {
    onError(ErrorMessage.CONNECTION_LOST);
  };

  var onRequestServerTimesUp = function (timeout, onError) {
    onError(ErrorMessage.TIMEOUT + timeout + TIMEOUT_UNIT);
  };

  var createXHR = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = RESPONSE_TYPE;
    xhr.timeout = TIMEOUT;

    xhr.addEventListener('load', onDataLoad.bind(null, xhr, onLoad, onError));
    xhr.addEventListener('error', onRequestErrorOccures.bind(null, onError));
    xhr.addEventListener('timeout', onRequestServerTimesUp.bind(null, xhr.timeout, onError));

    return xhr;
  };

  var requestLoad = function (onLoad, onError) {
    var xhr = createXHR(onLoad, onError);

    xhr.open('GET', Url.IN);
    xhr.send();
  };

  var requestSave = function (data, onLoad, onError) {
    var xhr = createXHR(onLoad, onError);

    xhr.open('POST', Url.OUT);
    xhr.send(data);
  };

  window.backend = {
    load: requestLoad,
    save: requestSave
  };
})();
