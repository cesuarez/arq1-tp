'use strict';

angular.module('angularApp').directive('publicEventsForm', function() {
	return {
		restrict: 'E',
		templateUrl:'partials/public-events-form.html'
	};
});