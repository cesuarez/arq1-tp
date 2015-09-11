'use strict';

angular.module('elmApp').directive('elmCounter', ['Elm', function(Elm){
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			Elm.embed(Elm.CounterMain, element[0]);
		}
	};
}]);