'use strict';

angular.module('angularApp').controller('CreatingTokenCtrl', function($scope, $location, AuthService, $window) {
    
    AuthService.login().then(function(data) {
        AuthService.getAuthUser().then(function(response) {
            var user = JSON.stringify(response.data.user);
            $window.localStorage.setItem('user', user);
            $location.path('/');
        });
    });
    
});