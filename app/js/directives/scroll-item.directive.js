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
  link(scope, element, attrs, trackerCtrl) {
    trackerCtrl.register(element, scope.object);
  }
  static export() {
    return new ScrollItem();
  }
}


export default ScrollItem.export;
