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
    // .state('contadores', {
    //   url: '/contadores',
    //   templateUrl: 'app/partials/contadores.html'
    // })
    .state('eventos', {
      url: '/eventos',
      templateUrl: 'app/partials/eventos.html'
    })
    .state('estampitas', {
      url: '/estampitas',
      templateUrl: 'app/partials/estampitas.html'
    });
});