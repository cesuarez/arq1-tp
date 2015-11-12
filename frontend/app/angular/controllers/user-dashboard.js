'use strict';

angular.module('angularApp').controller('UserDashboardCtrl', function($scope, $stateParams, Event, User) {
    
    $scope.getUser = function() {
        $scope.user = User.get({ id: $stateParams.id });
    };

    $scope.getUserEvents = function() {
        return Event.byUser({ 
            userId: $stateParams.id
        }, function(data) {
            $scope.events = data;
        });
    };

    $scope.init = function() {
        $scope.getUser();
        $scope.getUserEvents();
    };
    
    $scope.init();

    $scope.showMore = function() {
        if($scope.events.next_page_url) {
            Event.byUser({ 
                userId: $stateParams.id, 
                page: $scope.events.current_page + 1 
            }, function(data) {
                var events = $scope.events.data;
                var newEvents = data;
                newEvents.data = events.concat(newEvents.data);
                $scope.events = newEvents;
            });
        }
    };

    $scope.refreshEvents = function() {
        $scope.getUserEvents();
    };

    $scope.openCreateEvent = function() {
        $scope.$broadcast('open-create-event');
    };
    
});