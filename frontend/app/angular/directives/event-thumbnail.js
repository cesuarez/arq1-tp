'use strict';

angular.module('angularApp').directive('eventThumbnail', function() {
	return {
		restrict: 'E',
	    scope: {
	        event: '='
	    },
	    controller: function($scope){
	    	$scope.today = new Date();
	    	$scope.dateAfter = function(dateString){
	        	return $scope.today < new Date(dateString);
	        };
	    },
		templateUrl:'partials/event-thumbnail.html'
	};
});