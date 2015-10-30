'use strict';

angular.module('angularApp')
.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
})
.config(function($stateProvider, $urlRouterProvider, $authProvider, $provide, $httpProvider) {
  
  // Satellizer configuration that specifies which API
  $authProvider.loginUrl = '/auth';
  // Satellizer @FIX - Laravel espera el header en minuscula
  $authProvider.authHeader = 'authorization';

  function redirectWhenLoggedOut($q, $location, $window) {
      return {
          responseError: function(rejection) {
              //var $state = $injector.get('$state');
              if(rejection.status === 403 || rejection.status === 401) {
                $location.path('/');
              }
              return $q.reject(rejection);
          }
      };
  }

  // Setup for the $httpInterceptor
  $provide.factory('redirectWhenLoggedOut', redirectWhenLoggedOut);

  // Push the new factory onto the $http interceptor array
  $httpProvider.interceptors.push('redirectWhenLoggedOut');
  
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
    })
    .state('events', {
      url: '/events',
      controller: 'EventsPublicDashboardCtrl',
      templateUrl: 'partials/events-public-dashboard.html',
    })
    .state('user', {
      url: '/user/:id',
      controller: 'UserDashboardCtrl',
      templateUrl: 'partials/user-dashboard.html',
    });
});

