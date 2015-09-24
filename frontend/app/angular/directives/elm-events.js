'use strict';

angular.module('elmApp').directive('elmEvents', ['Elm', function(Elm){
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			Elm.embed(Elm.Events, element[0]);
		}
	};
}]);