'use strict';

angular.module('angularApp').directive('eventThumbnail', function() {
	return {
		restrict: 'E',
	    scope: {
	        event: '='
	    },
		templateUrl:'partials/event-thumbnail.html'
	};
});