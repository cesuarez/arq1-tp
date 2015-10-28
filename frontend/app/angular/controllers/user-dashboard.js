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
    
    // TODO: este codigo se repite tambien en HOME
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