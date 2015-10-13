'use strict';

angular.module('angularApp').directive('publicEventsList', function() {
	return {
		restrict: 'E',
	    scope: {
	        events: '='
	    },
		templateUrl:'partials/public-events-list.html'
	};
});