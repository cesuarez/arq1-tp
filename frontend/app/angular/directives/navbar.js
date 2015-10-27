'use strict';

angular.module('angularApp').directive('navbar', function() {
	return {
		restrict: 'E',
		templateUrl:'partials/navbar.html'
	};
});