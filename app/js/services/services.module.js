'use strict';

import angular from 'angular';

import VideoManagerService from './video-manager.service';


const ServicesModule =
  angular.module('cgmemory.services', [])
    .service('videoManager', VideoManagerService);


export default ServicesModule;
