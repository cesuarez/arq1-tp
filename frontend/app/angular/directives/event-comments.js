'use strict';

angular.module('angularApp').directive('eventComments', function() {
	return {
		restrict: 'E',
	    scope: true,
	    controller: 'EventCommentsCtrl',
		templateUrl:'partials/event-comments.html'
	};
});