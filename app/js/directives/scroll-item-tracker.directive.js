'use strict';

class TrackedItem {

  constructor(element, object) {
    this.element = element;
    this.object = object;
    this.position = null;
    this.splitVal = null;
  }

}

class ScrollItemTracker {

  constructor() {
    this.restrict = 'E';
    this.controller = ScrollItemTrackerController;
    this.scope = {
      model: '=',
      splitFn: '=?',
      splitLocations: '=?',
    };
  }

  static export() {
    return new ScrollItemTracker();
  }

}

class ScrollItemTrackerController {

  constructor($scope, $window, lodash) {
    this._ = lodash;
    this.$scope = $scope;
    this.$window = $window;
    this.items = [];
    this.loaded = 0;

    $window.addEventListener('scroll', () => { this.$scope.$apply(() => this.update())});
  }

  calculate() {
    const fn = this.$scope.splitFn;

    this._.forEach(this.items, (trackedItem) => {
      const position = $(trackedItem.element).offsetParent().position().top;
      trackedItem.position = position;

      if (fn) {
        trackedItem.splitVal = fn(trackedItem.object);
        trackedItem.element.attr('split-val', fn(trackedItem.object));
      }
    });
  }

  calculateSplit() {
    if (!this.$scope.splitLocations || this.$scope.splitLocations.constructor !== Array) { return; }
    this.$scope.splitLocations.length = 0;

    const locs = {};
    this._.forEach(this.items, (trackedItem) => {
      const splitVal = trackedItem.splitVal;
      if (!splitVal) { return; }

      const position = trackedItem.position;
      if (typeof locs[splitVal] == 'undefined') {
        locs[splitVal] = { value: splitVal };
      }
      if (typeof locs[splitVal].start == 'undefined' || locs[splitVal].start > position) {
        locs[splitVal].start = position;
      }
      else if (typeof locs[splitVal].end == 'undefined' || locs[splitVal].end < position) {
        locs[splitVal].end = position;
      }
    });

    this._.forEach(locs, (location) => { this.$scope.splitLocations.push(location); });
  }

  find(offset) {
    let highest = null;
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      const pastOffset = item.position >= offset;
      const higherThanExisting = !highest || item.position <= highest.position;
      if (pastOffset && higherThanExisting) {
        highest = item;
      }
    }
    return highest.object;
  }

  register(element, object) {
    const item = new TrackedItem(element, object);
    this.items.push(item);

    item.element.bind('load', () => {
      this.loaded++;
      if (this.loaded == this.items.length) {
        this.calculate();
        this.calculateSplit();
        this.$scope.$apply(() => this.update());
      }
    });
  }

  update() {
    this.$scope.model = this.find(this.$window.pageYOffset);
  }

}


export default ScrollItemTracker.export;
