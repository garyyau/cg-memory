'use strict';

import angular from 'angular';

import 'angular-moment';
import 'ng-lodash';

import './timeline/timeline.module';

import scrollItem from './directives/scroll-item.directive';
import scrollTracker from './services/scroll-tracker.service';
import videoManager from './services/video-manager.service';


angular
  .module('cgmemory', [
    /* Internal Modules */
    'timeline',
    /* External Modules */
    'angularMoment',
    'ngLodash',
  ])
  .directive('scrollItem', scrollItem)
  .service('scrollTracker', scrollTracker)
  .service('videoManager', videoManager);
