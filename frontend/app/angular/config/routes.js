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
              var $state = $injector.get('$state');
              if(response.status === 403) {
                  $state.transitionTo('home');
              }
              if ( response.status === 401 || 
                  (response.status === 404 && response.data.error === 'user_not_found') ) {
                  $window.localStorage.clear();
                  if ($state.current.name === 'home'){
                      $window.location.reload();
                  } else {
                      $state.transitionTo('home');
                  }
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
      templateUrl: 'partials/home.html'
    })
    .state('login', {
      url: '/login/:jwt',
      controller: 'LoginCtrl'
    })
    .state('event', {
      url: '/event/:id',
      controller: 'EventDetailsCtrl',
      templateUrl: 'partials/event-details.html'
    })
    .state('user', {
      url: '/user/:id',
      controller: 'UserDashboardCtrl',
      templateUrl: 'partials/user-dashboard.html',
    });
});

