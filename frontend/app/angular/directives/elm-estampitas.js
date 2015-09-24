'use strict';

angular.module('elmApp').directive('elmEstampitas', ['Elm', function(Elm){
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			Elm.embed(Elm.Estampitas, element[0]);
		}
	};
}]);