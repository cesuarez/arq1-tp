'use strict';

angular.module('angularApp').controller('EventsPublicDashboardCtrl', function($scope, AuthService, Event) {

    $scope.getPublicEvents = function() {
        return Event.mostRecent(function(data) {
            $scope.events = data;
        });
    };
    
    $scope.init = function() {
        $scope.getPublicEvents();
    };
    
    $scope.init();

    $scope.showMore = function() {
        if($scope.events.next_page_url) {
            Event.mostRecent({
                page: $scope.events.current_page + 1 
            }, function(data) {
                var events = $scope.events.data;
                var newEvents = data;
                newEvents.data = events.concat(newEvents.data);
                $scope.events = newEvents;
            });
        }
    };
    
});