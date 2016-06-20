'use strict';

import angular from 'angular';

import 'angular-moment';
import 'ng-lodash';

import TimelineController from './timeline.controller';
import ScrollItemDirective from './directives/scroll-item.directive';
import ScrollItemTrackerDirective from './directives/scroll-item-tracker.directive';
import VideoManagerService from './services/video-manager.service';


const CGMemoryApp =
  angular
    .module('cgmemory', ['angularMoment', 'ngLodash']);

CGMemoryApp.controller('TimelineController', TimelineController);
CGMemoryApp.directive('scrollItem', ScrollItemDirective);
CGMemoryApp.directive('scrollItemTracker', ScrollItemTrackerDirective);
CGMemoryApp.service('videoManager', VideoManagerService);
