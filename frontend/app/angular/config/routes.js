'use strict';

angular.module('angularApp').config(function($stateProvider, $urlRouterProvider, $authProvider) {
  
  // Satellizer configuration that specifies which API
  $authProvider.loginUrl = '/auth';

  // Satellizer @FIX - Laravel espera el header en minuscula
  //$authProvider.authHeader = 'authorization';

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      controller: 'HomeCtrl',
      templateUrl: 'partials/main.html'
    })
    .state('login', {
      url: '/login/:jwt',
      controller: 'LoginCtrl'
    })
    .state('event', {
      url: '/event/:id',
      controller: 'EventDetailsCtrl',
      templateUrl: 'partials/event-details.html',
      resolve: {
        event: function($stateParams, Event) {
          return Event.get({ id: $stateParams.id });
        },
        comments: function($stateParams, Event) {
          return Event.comments({ id: $stateParams.id });
        }
      }
    });
});