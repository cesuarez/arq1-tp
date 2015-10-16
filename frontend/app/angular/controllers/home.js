'use strict';

angular.module('angularApp').controller('HomeCtrl', function($scope, Event) {
    
    $scope.mostRecent = function() {
        Event.mostRecent(function(data) {
            $scope.events = data;
        });
        Event.count(function(data) {
            $scope.eventCount = data[0];
        });
    };
    
    $scope.mostRecent();
    
    $scope.newEvent = function() {
        $scope.event = new Event({ 
            date: new Date(),
            privacy: 'public'
        });
    };
    
    $scope.saveEvent = function() {
        $scope.event.$save(function(data) {
            $scope.mostRecent();
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