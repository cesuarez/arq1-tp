'use strict';

angular.module('angularApp').directive('eventSupplies', function() {
	return {
		restrict: 'E',
	    scope: true,
	    controller: 'EventSuppliesCtrl',
		templateUrl:'partials/event-supplies.html'
	};
});