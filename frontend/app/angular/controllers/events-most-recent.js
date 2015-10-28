'use strict';

angular.module('angularApp').controller('EventsMostRecentCtrl', function($scope, EventsDashboard) {
    
    $scope.events = EventsDashboard.mostRecent;

    EventsDashboard.getMostRecentEvents();
    
    $scope.next = function() {
        
    };
    
    $scope.prev = function() {
        
    };

});