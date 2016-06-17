'use strict';

import angular from 'angular';

import TimelineController from './timeline.controller';
import TimelineRoute from './timeline.route';


const TimelineModule =
  angular
    .module('cgmemory.timeline', [])
    .controller('TimelineController', TimelineController)
    .config(TimelineRoute);


export default TimelineModule;
