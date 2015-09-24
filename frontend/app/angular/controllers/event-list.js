'use strict';

angular.module('elmApp').controller('EventListCtrl', ['$scope', 'Elm', 'Event',
    function($scope, Elm, Event) {
        $scope.events = [];
        
        $scope.events.push(new Event({
            description: 'Choripateada',
            date: new Date()
        }));
    }
]);