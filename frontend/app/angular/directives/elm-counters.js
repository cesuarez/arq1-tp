'use strict';

angular.module('elmApp').directive('elmCounters', ['Elm', function(Elm){
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			Elm.embed(Elm.CounterListMain, element[0]);
		}
	};
}]);