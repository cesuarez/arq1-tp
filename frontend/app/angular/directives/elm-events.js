'use strict';

angular.module('elmApp').directive('elmEvents', ['Elm', 'ElmEvents', 
	function(Elm, ElmEvents){
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				var events = Elm.embed(Elm.Events, element[0], { getEvents: [] });
				ElmEvents.sendEvents(events);
			}
		};
	}
]);