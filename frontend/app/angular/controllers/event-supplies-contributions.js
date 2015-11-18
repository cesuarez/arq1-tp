'use strict';

angular.module('angularApp').controller('EventSuppliesContributionsCtrl', function($scope, $modalInstance, supply) {
    
    $scope.supply = supply;
    
    $scope.addContribution = function() {
        
    };

    $scope.removeContribution = function() {
        
    };
    
    $scope.close = function() {
        $modalInstance.close();
    };

});
