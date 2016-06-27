'use strict';

import angular from 'angular';

class ScrollItem {

  constructor() {
    this.restrict = 'A';
    this.scope = {
      object: '=scrollItem',
      tracker: '=',
    };
  }

  link(scope, element, attrs) {
    scope.tracker.registerItem(element, scope.object);
  }

  static export() {
    return new ScrollItem();
  }

}

export default ScrollItem.export;
