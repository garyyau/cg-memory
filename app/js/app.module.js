'use strict';

import angular from 'angular';

import 'angular-youtube-api-factory';
import 'ng-infinite-scroll';
import 'ng-lodash';

import TimelineController from './timeline.controller';
import VideoManagerService from './services/video-manager.service';


const CGMemoryApp =
  angular
    .module('cgmemory', [
      'infinite-scroll',
      'jtt_youtube',
      'ngLodash',
    ]);

CGMemoryApp.controller('TimelineController', TimelineController);

CGMemoryApp.service('videoManager', VideoManagerService);
