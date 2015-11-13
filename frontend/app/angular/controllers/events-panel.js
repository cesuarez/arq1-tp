'use strict';

angular.module('angularApp').controller('EventsPanelCtrl', function($scope, AuthService, Event) {
    
    if($scope.config.injectForTitle) {
        $scope.config.injectForTitle($scope);
    }

    $scope.refreshEvents = function(data) {
        if(data) {
            $scope.events = data;
        } else {
            $scope.events = $scope.config.getFrom($scope.config.getParams);
            $scope.events.$promise.then(function(data) {
                $scope.total = data.total;
            });
        }
    };
    
    $scope.refreshEvents();
    
    $scope.$on('refresh-events', function(ev, data) {
        $scope.refreshEvents(data);
    });
    
    $scope.openCreateEvent = function() {
        $scope.$broadcast('open-create-event');
    };
    
    $scope.openSearch = function() {
        $scope.$broadcast('open-search-events');
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