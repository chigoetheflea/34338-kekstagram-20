'use strict';

(function () {
  var ACTIVE_FILTER_CLASS = 'img-filters__button--active';
  var RANDOM_IMAGES_COUNT = 10;

  var filters = document.querySelector('.img-filters');
  var filtersForm = filters.querySelector('.img-filters__form');
  var filterButtons = filtersForm.querySelectorAll('.img-filters__button');

  var defaultFilter = filtersForm.querySelector('#filter-default');
  var randomFilter = filtersForm.querySelector('#filter-random');
  var discussedFilter = filtersForm.querySelector('#filter-discussed');

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
    var isRandom = evt.target === randomFilter;
    var isDiscussed = evt.target === discussedFilter;

    var activeGallery = defaultData;
    var activeFilter = defaultFilter;

    if (isRandom) {
      activeGallery = window.support.getShuffledArray(data).slice(0, RANDOM_IMAGES_COUNT);

      activeFilter = randomFilter;
    }

    if (isDiscussed) {
      activeGallery = data.sort(sortImages);

      activeFilter = discussedFilter;
    }

    window.gallery.clear();

    window.gallery.show(activeGallery);

    setActiveStatus(activeFilter);
  };

  var onFilterClick = function (data, evt) {
    window.debounce.set(applyFilter.bind(null, data, evt));
  };

  var initFilters = function (data) {
    window.gallery.show(data);

    defaultData = data.slice();

    filters.classList.remove('img-filters--inactive');

    filtersForm.addEventListener('click', onFilterClick.bind(null, data));
  };

  window.filters = {
    init: initFilters
  };
})();
