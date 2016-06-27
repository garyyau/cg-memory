'use strict';

const SPLIT_VAL_ATTRIBUTE = 'scroll-section';

class Item {

  constructor(element, object) {
    this.element = element;
    this.object = object;
    this.splitVal = null;
  }

}

class ScrollTracker {

  constructor(lodash) {
    this._ = lodash;
    this.items = [];
    this.splitVals = [];
    this.loaded = 0;
    this.splitFn = () => null;
  }

  registerItem(element, object) {
    const item = new Item(element, object);
    this.setSplitVal(item);
    this.items.push(item);
  }

  registerSplitFn(fn) {
    this.splitFn = fn;
  }

  getSplitLocation(splitVal) {
    const elements = $(`[split-val='${splitVal}']`);
    const first = this._.head(elements);
    const last = this._.last(elements);

    const firstTop = $(first).offsetParent().offset().top;
    const lastTop = $(last).offsetParent().offset().top;
    const lastHeight = $(last).offsetParent().outerHeight();

    return { start: firstTop, end: lastTop + lastHeight };
  }

  getSplitVals() {
    return this.splitVals;
  }

  setSplitVal(item) {
    item.splitVal = this.splitFn(item.object);
    item.element.attr('split-val', item.splitVal);

    if (this._.indexOf(this.splitVals, item.splitVal) == -1) {
      this.splitVals.push(item.splitVal);
    }
  }

}

export default ScrollTracker;
