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

    $scope.save = function() {
        $scope.$broadcast('upload-file');
        $scope.$on('upload-finished', function(evt, data) {
            console.log(data);
            $scope.event.img = data.public_id;
            $scope.event.$save(function(data) {
                $scope.events.push(data);
                $scope.event = undefined;
            });
        });
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