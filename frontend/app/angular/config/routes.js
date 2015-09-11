'use strict';

angular.module('elmApp').config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise('/');

  // Now set up the states
  $stateProvider
    .state('home', {
      url: '/',
      controller: 'HomeCtrl',
      templateUrl: 'app/partials/main.html'
    })
    .state('contador', {
      url: '/contador',
      templateUrl: 'app/partials/contador.html'
    })
    .state('contadores', {
      url: '/contadores',
      templateUrl: 'app/partials/contadores.html'
    });
});