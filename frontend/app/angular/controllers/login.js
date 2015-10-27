'use strict';

angular.module('angularApp').controller('LoginCtrl', 
	function($scope, $location, AuthService, $stateParams) {
	    
	AuthService.login($stateParams.jwt).then(function() {
	    $location.path('/');
	});
    
});