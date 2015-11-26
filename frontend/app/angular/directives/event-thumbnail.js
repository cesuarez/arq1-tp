'use strict';

angular.module('angularApp').directive('eventThumbnail', function() {
	return {
		restrict: 'E',
	    scope: {
	        event: '='
	    },
	    controller: function($scope){
	    	$scope.today = Date();
	    	$scope.dateAfter = function(dateString) {
	        	return $scope.today < Date(dateString);
	        };
	    },
		templateUrl:'partials/event-thumbnail.html'
	};
});