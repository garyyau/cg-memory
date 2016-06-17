'use strict';

import angular from 'angular';

import TimelineConfig from './timeline.config';
import TimelineController from './timeline.controller';


const TimelineModule =
  angular
    .module('cgmemory.timeline', [])
    .controller('TimelineController', TimelineController)
    .config(TimelineConfig);


export default TimelineModule;
