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
              var ngNotify = $injector.get('ngNotify');
              if(response.status === 500) {
                  $state.transitionTo('home');
                  ngNotify.set('The service has an internal error. We are working on it!', 'error');
              }
              if(response.status === 503) {
                  $state.transitionTo('home');
                  ngNotify.set('Service not available, please retry later', 'error');
              }
              if(response.status === 400) {
                  $state.transitionTo('home');
                  ngNotify.set('Cannot perform that request', 'error');
              }
              if(response.status === 422) {
                  ngNotify.set('Your request has errors', 'error');
              }
              if(response.status === 403 || response.status === 404) {
                  $state.transitionTo('home');
                  ngNotify.set('Not authorized', 'error');
              }
              if ( response.status === 401 || 
                  (response.status === 404 && response.data.error === 'user_not_found') ) {
                  $window.localStorage.clear();
                  ngNotify.set('Please login or sign up...', 'error');
                  if ($state.current.name === 'home') {
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

