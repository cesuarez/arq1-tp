'use strict';

angular.module('angularApp').controller('HomeCtrl', function($scope, AuthService, Event) {

    $scope.getUserEvents = function() {
        if (AuthService.getAuthUser()){
            return Event.byUser({ 
                userId: AuthService.getAuthUser().id
            }, function(data) {
                $scope.userEvents = data;
            });
        }
    };

    $scope.getMostRecentEvents = function() {
        return Event.mostRecent(function(data) {
            $scope.mostRecent = data;
        });
    };
    
    $scope.refreshEvents = function() {
        $scope.getUserEvents();
        $scope.getMostRecentEvents();
    };
    
    $scope.refreshEvents();
    
    $scope.openCreateEvent = function() {
        $scope.$broadcast('open-create-event');
    };

});