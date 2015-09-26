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
      templateUrl: 'partials/main.html'
    })
    // .state('contadores', {
    //   url: '/contadores',
    //   templateUrl: 'partials/contadores.html'
    // })
    .state('eventos', {
      url: '/eventos',
      templateUrl: 'partials/eventos.html'
    })
    .state('estampitas', {
      url: '/estampitas',
      templateUrl: 'partials/estampitas.html'
    });
});