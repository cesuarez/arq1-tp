'use strict';

angular.module('angularApp').controller('PickDateCtl', function($scope) {
    
    $scope.calendar = {
        minDate: new Date(),
        opened: false,
    };
    
    $scope.open = function($event) {
        $scope.calendar.opened = true;
    };

});
