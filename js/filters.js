'use strict';

(function () {
  var ACTIVE_FILTER_CLASS = 'img-filters__button--active';
  var RANDOM_IMAGES_COUNT = 10;

  var filters = document.querySelector('.img-filters');
  var filtersForm = filters.querySelector('.img-filters__form');
  var filterButtons = filtersForm.querySelectorAll('.img-filters__button');

  var filterDefault = filtersForm.querySelector('#filter-default');
  var filterRandom = filtersForm.querySelector('#filter-random');
  var filterDiscussed = filtersForm.querySelector('#filter-discussed');

  var defaultData = null;

  var setActiveStatus = function (filter) {
    filterButtons.forEach(function (element) {
      element.classList.remove(ACTIVE_FILTER_CLASS);
    });

    filter.classList.add(ACTIVE_FILTER_CLASS);
  };

  var sortImages = function (left, right) {
    if (left.comments.length < right.comments.length) {
      return 1;
    }

    if (left.comments.length > right.comments.length) {
      return -1;
    }

    return 0;
  };

  var applyFilter = function (data, evt) {
    var isDefault = evt.target === filterDefault;
    var isRandom = evt.target === filterRandom;
    var isDiscussed = evt.target === filterDiscussed;

    window.gallery.clear();

    if (isDefault) {
      window.gallery.show(defaultData);

      setActiveStatus(filterDefault);
    }

    if (isRandom) {
      window.gallery.show(window.support.getShuffledArray(data).slice(0, RANDOM_IMAGES_COUNT));

      setActiveStatus(filterRandom);
    }

    if (isDiscussed) {
      window.gallery.show(data.sort(sortImages));

      setActiveStatus(filterDiscussed);
    }
  };

  var onFilterClick = function (data, evt) {
    window.debounce(applyFilter.bind(null, data, evt));
  };

  window.filtersInit = function (data) {
    window.gallery.show(data);

    defaultData = data.slice();

    filters.classList.remove('img-filters--inactive');

    filtersForm.addEventListener('click', onFilterClick.bind(null, data));
  };
})();
