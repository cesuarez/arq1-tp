'use strict';

angular.module('angularApp').controller('LoginCtrl', 
	function($scope, $location, AuthService, $window, $stateParams) {
    
	$window.localStorage.setItem('satellizer_token', $stateParams.jwt);
    AuthService.getAuthUser().then(function(response) {
        var user = JSON.stringify(response.data.user);
        $window.localStorage.setItem('user', user);
        $location.path('/');
    });
    
});