'use strict';

angular.module('angularApp').controller('EventSuppliesCtrl', function($scope, Supply) {
    
    $scope.totalContributions = function(s) {
        return s.contributions.reduce(function(r, x) {
          return r + x.amount;
        }, 0);
    };
    
    $scope.fulfilled = function(s) {
        return s.amount <= $scope.totalContributions(s);
    };

    $scope.notFulfilled = function(s) {
        return s.amount > $scope.totalContributions(s);
    };
    
    $scope.newSupply = function() {
        $scope.supply = new Supply({
            required: $scope.event.isOwner,
            fulfilled: !$scope.event.isOwner,
            amount: 1,
        });
    };
    
    $scope.changeRequired = function() {
        $scope.supply.fulfilled = !$scope.supply.required;
    };
    
    $scope.refreshSupplies = function(data) {
        $scope.event.supplies = data.supplies;
        $scope.newSupply();
    };
    
    $scope.addSupply = function() {
        Supply.save({eventId: $scope.event.id}, $scope.supply, $scope.refreshSupplies);
    };
    
    $scope.removeSupply = function(item) {
        new Supply(item).$delete({ eventId: $scope.event.id}, $scope.refreshSupplies);
    };
    
    $scope.openContributions = function() {
        console.log('sarasa');
    };
    
    $scope.newSupply();
    
});