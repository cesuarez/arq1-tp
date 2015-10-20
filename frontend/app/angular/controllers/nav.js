'use strict';

angular.module('angularApp').controller('NavCtrl', function($scope, $location, AuthService, $window, $auth) {
    
    $scope.username = function(){
    	var user = $window.localStorage.getItem('user');
    	if (user !== null && user !== undefined){
    		return JSON.parse(user).name;
    	}
    };

    $scope.isLoggedIn = function(){
    	return $auth.isAuthenticated();
    };

    $scope.logout = function(){
    	if ($auth.isAuthenticated()) {
            AuthService.logout().then(function() {
                $window.localStorage.removeItem('user');
                $location.path('/');
            });
        }
    };
    
});