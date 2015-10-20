'use strict';

angular.module('angularApp').config(function($stateProvider, $urlRouterProvider, $authProvider) {
  
  // Satellizer configuration that specifies which API
  $authProvider.loginUrl = '/auth';

  // Satellizer @FIX - Laravel espera el header en minuscula
  $authProvider.authHeader = 'authorization';

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      controller: 'HomeCtrl',
      templateUrl: 'partials/main.html'
    })
    .state('creating-token', {
      url: '/creating-token',
      controller: 'CreatingTokenCtrl'
    });
});