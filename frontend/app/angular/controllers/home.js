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

    $scope.newEvent = function() {
        $scope.event = new Event({ 
            date: new Date(),
            privacy: 'public',
            user_id: $scope.authUser.id
        });
    };

    $scope.saveEvent = function() {
        var event = $scope.event;
        $scope.event = undefined;
        event.$save(function(data) {
            $scope.refreshEvents();
        }, function() {
            $scope.event = event;
        });
    };

    $scope.save = function() {
        $scope.$on('upload-finished', function(evt, data) {
            $scope.event.img = data.public_id;
            $scope.saveEvent();
        });
        $scope.$on('upload-failed', function(evt, data) {
            $scope.saveEvent();
        });
        $scope.$broadcast('upload-file');
    };

    $scope.cancel = function() {
        $scope.event = undefined;
    };

    $scope.minDate = new Date();
    
    $scope.open = function($event) {
        $scope.status.opened = true;
    };

    $scope.format = 'dd-MM-yyyy';

    $scope.status = {
        opened: false
    };
    
});