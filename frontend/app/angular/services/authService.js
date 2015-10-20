'use strict';

angular.module('angularApp').service('AuthService', function($auth, $http) {

    this.login = function(){
        return $auth.login({});
    };

    this.getAuthUser = function(){
    	return $http.get('/user');
    };

    this.logout = function(){
		return $auth.logout();
    };

});