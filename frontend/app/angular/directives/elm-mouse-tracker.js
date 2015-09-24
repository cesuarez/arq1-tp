'use strict';

angular.module('elmApp').directive('elmMouseTracker', ['Elm', function(Elm){
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			Elm.embed(Elm.MouseTracker, element[0]);
		}
	};
}]);