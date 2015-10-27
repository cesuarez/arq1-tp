'use strict';

angular.module('angularApp').controller('NavCtrl', function($scope, $location, AuthService) {
    
    $scope.logout = function(){
    	AuthService.logout().then(function() {
    	    $location.path('/');
    	});
    };
    
});