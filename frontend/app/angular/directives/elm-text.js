'use strict';

angular.module('elmApp').directive('elmText', ['Elm', function(Elm){
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			Elm.embed(Elm.TextMain, element[0]);
		}
	};
}]);