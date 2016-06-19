'use strict';

import angular from 'angular';


class ScrollItem {
  constructor() {
    this.restrict = 'A';
    this.require = '^^scrollItemTracker';
    this.scope = {
      object: '=scrollItem',
    };
  }
  link(scope, element, attrs, scrollItemTracker) {
    scrollItemTracker.register(element, scope.object);
  }
  static export($parse) {
    return new ScrollItem($parse);
  }
}


export default ScrollItem.export;
