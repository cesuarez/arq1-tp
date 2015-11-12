'use strict';

angular.module('angularApp').directive('eventsFastForm', function() {
	return {
		restrict: 'E',
		controller: 'EventFastFormCtrl',
		templateUrl:'partials/events-fast-form.html'
	};
});