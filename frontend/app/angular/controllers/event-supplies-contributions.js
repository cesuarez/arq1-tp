'use strict';

angular.module('angularApp').controller('EventSuppliesContributionsCtrl', function($scope, $modalInstance, supply, totalContributions, Contribution) {
    
    $scope.supply = supply;
    $scope.totalContributions = totalContributions;
    
    $scope.newContribution = function() {
      $scope.contribution = new Contribution({ amount: 1 });
    };
    
    $scope.addContribution = function() {
        
    };

    $scope.removeContribution = function() {
        
    };
    
    $scope.close = function() {
        $modalInstance.close();
    };
    
    $scope.newContribution();

});
