'use strict';

class ScrollItem {
  constructor(element, object) {
    this.element = element;
    this.object = object;
    this.position = null;
  }
}

class ScrollItemTracker {
  constructor() {
    this.restrict = 'E';
    this.controller = ScrollItemTrackerController;
    this.scope = {
      model: '=',
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

    $window.addEventListener('scroll', () => {
      this.update();
    });
  }
  calculate() {
    this._.forEach(this.items, (scrollItem) => {
      const position = $(scrollItem.element).offsetParent().position().top;
      scrollItem.position = position;
    });
    this.update();
  }
  find(offset) {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      if (item.position > offset) {
        return item.object;
      }
    }
  }
  register(element, object) {
    const item = new ScrollItem(element, object);
    this.items.push(item);

    item.element.bind('load', () => {
      this.loaded++;
      if (this.loaded == this.items.length) {
        this.calculate();
      }
    });
  }
  update() {
    this.$scope.$apply(() => {
      this.$scope.model = this.find(this.$window.pageYOffset);
    });
  }
}


export default ScrollItemTracker.export;
