'use strict';

import angular from 'angular';

import 'ng-lodash';

import TimelineController from './timeline.controller';
import VideoManagerService from './services/video-manager.service';


const CGMemoryApp =
  angular
    .module('cgmemory', ['ngLodash']);

CGMemoryApp.controller('TimelineController', TimelineController);

CGMemoryApp.service('videoManager', VideoManagerService);
