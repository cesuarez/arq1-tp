'use strict';

angular.module('angularApp').directive('eventsPanel', function() {
	return {
		restrict: 'E',
		scope: {
			config: '=' 
		},
		controller: 'EventsPanelCtrl',
		templateUrl:'partials/events-panel.html'
	};
});