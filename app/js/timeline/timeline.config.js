'use strict';

import angular from 'angular';


const config = ($routeProvider) => {
  $routeProvider
    .when('/', {
      templateUrl: './js/timeline/timeline.html',
      controller: 'TimelineController',
      controllerAs: 'vm',
    });
};
