'use strict';

angular.module('angularApp').service('AuthService', function($auth, $http, $window, $rootScope) {
    
    if($auth.isAuthenticated()) {
        $rootScope.authUser = JSON.parse($window.localStorage.getItem('user'));
    }
    
    this.login = function(jwt) {
    	$window.localStorage.setItem('satellizer_token', jwt);
    	return $http.get('/user').then(function(response) {
            this.setAuthUser(response.data.user);
        }.bind(this));
    };

    this.setAuthUser = function(user) {
        var userJSON = JSON.stringify(user);
        $window.localStorage.setItem('user', userJSON);
        $rootScope.authUser = user;
    };

    this.getAuthUser = function() {
    	return $rootScope.authUser;
    };
    
    this.logout = function() {
        $window.localStorage.removeItem('user');
        $rootScope.authUser = undefined;
		return $auth.logout();
    };

});