'use strict';

angular.module('angularApp').controller('NavCtrl', function($scope, $routeParams) {
    
    $scope.username = function(){
        return $routeParams.user;
    };

    $scope.isLoggedIn = function(){
        console.log($routeParams);
        return $routeParams.hasOwnProperty('username');
    };
    
});