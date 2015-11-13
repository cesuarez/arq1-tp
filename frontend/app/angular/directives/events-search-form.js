'use strict';

angular.module('angularApp').directive('eventsSearchForm', function() {
	return {
		restrict: 'E',
		scope: {
			'defaultParams': '='
		},
		controller: 'EventsSearchFormCtrl',
		templateUrl:'partials/events-search-form.html'
	};
});