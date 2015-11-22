'use strict';

angular.module('angularApp').controller('EventSuppliesContributionsCtrl', function($scope, $modalInstance, supply, totalContributions, Contribution) {
    
    $scope.supply = supply;
    $scope.totalContributions = totalContributions;
    
    $scope.newContribution = function() {
      $scope.contribution = new Contribution({ amount: 1 });
    };
    
    $scope.refreshContributions = function(data) {
        $scope.supply.contributions = data.contributions;
    };
    
    $scope.addContribution = function() {
        Contribution.save(
            {   
                eventId: $scope.supply.event_id, 
                supplyId: $scope.supply.id
            },
            $scope.contribution, 
            $scope.refreshContributions
        );
    };

    $scope.removeContribution = function(item) {
        new Contribution(item).$delete(
            {   
                eventId: $scope.supply.event_id, 
                supplyId: $scope.supply.id
            },
            $scope.refreshContributions
        );
    };
    
    $scope.close = function() {
        $modalInstance.close();
    };
    
    $scope.newContribution();

});
