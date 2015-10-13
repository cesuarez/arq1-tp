'use strict';

angular.module('angularApp').controller('HomeCtrl', function($scope, Event) {
    
    Event.query(function(data) {
        $scope.events = data;
    });

});