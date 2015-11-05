'use strict';

angular.module('angularApp')

.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
})

.config(function($authProvider) {
  $authProvider.loginUrl = '/auth';
  // Satellizer @FIX - Laravel espera el header en minuscula
  $authProvider.authHeader = 'authorization';
})

.config(function($stateProvider, $urlRouterProvider, $provide, $httpProvider) {

  function redirectWhenLoggedOut($location, $q, $injector, $window) {
      return {
          responseError: function(response) {
              //var $state = $injector.get('$state');
              if(response.status === 403) {
                  $injector.get('$state').transitionTo('home');
              }
              if (response.status === 401){
                  $window.localStorage.clear();
                  $injector.get('$state').transitionTo('home');
              }
              return $q.reject(response);
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

