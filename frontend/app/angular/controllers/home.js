'use strict';

angular.module('angularApp').controller('HomeCtrl', function($scope, Event) {
    
    $scope.getEvents = function() {
        Event.query(function(data) {
            $scope.events = data;
        });
    };
    
    $scope.getEvents();
    
    $scope.newEvent = function() {
        $scope.event = new Event({ 
            date: new Date(),
            privacy: 'public'
        });
    };
    
    $scope.saveEvent = function() {
        $scope.event.$save(function(data) {
            $scope.getEvents();
            $scope.event = undefined;
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