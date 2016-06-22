'use strict';

import angular from 'angular';

import 'angular-moment';
import 'ng-lodash';

import TimelineController from './timeline.controller';
import ScrollItemDirective from './directives/scroll-item.directive';
import ScrollTrackerFactory from './services/scroll-tracker.factory';
import VideoManagerService from './services/video-manager.service';


const CGMemoryApp =
  angular
    .module('cgmemory', ['angularMoment', 'ngLodash']);

CGMemoryApp.controller('TimelineController', TimelineController);
CGMemoryApp.directive('scrollItem', ScrollItemDirective);
CGMemoryApp.factory('scrollTracker', ScrollTrackerFactory);
CGMemoryApp.service('videoManager', VideoManagerService);
