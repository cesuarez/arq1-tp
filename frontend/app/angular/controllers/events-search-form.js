'use strict';

angular.module('angularApp').controller('EventsSearchFormCtrl', function($scope, Event) {

    $scope.newSearch = function() {
        $scope.search = $scope.defaultParams ? $scope.defaultParams : {};
    };

    $scope.$on('open-search-events', function() {
        $scope.newSearch();
    });

    $scope.find = function() {
        $scope.search.page = undefined;
        Event.get($scope.search, function(data) {
            $scope.results = data.total;
            $scope.$emit('refresh-events', data);
        });
    };
    
    $scope.close = function() {
        $scope.search.text = undefined;
        $scope.search.before = undefined;
        $scope.search.after = undefined;
        $scope.search.page = undefined;
        $scope.search = undefined;
        $scope.results = undefined;
        $scope.$emit('refresh-events');
    };

});