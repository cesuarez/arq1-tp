'use strict';

angular.module('angularApp').controller('EventsPanelCtrl', function($scope, AuthService, Event) {
    
    $scope.config.injectForTitle($scope);

    $scope.refreshEvents = function() {
        $scope.events = $scope.config.getFrom($scope.config.getParams);
    };
    
    $scope.refreshEvents();
    
    $scope.$on('refresh-events', function() {
        $scope.refreshEvents();
    });
    
    $scope.openCreateEvent = function() {
        $scope.$broadcast('open-create-event');
    };

    $scope.showMore = function() {
        if($scope.events.next_page_url) {
            // if no getParams setted
            $scope.config.getParams = $scope.config.getParams ? $scope.config.getParams : {};
            $scope.config.getParams.page = $scope.events.current_page + 1;
            $scope.config.getFrom($scope.config.getParams, function(data) {
                var events = $scope.events.data;
                var newEvents = data;
                newEvents.data = events.concat(newEvents.data);
                $scope.events = newEvents;
            });
        }
    };
    
});