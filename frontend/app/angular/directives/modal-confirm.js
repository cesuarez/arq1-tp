'use strict';

angular.module('angularApp').directive('confirmButton', function(ConfirmActionService) {
  return {
    restrict: 'A',
    scope: {
      msg: '=',
      action: '&'
    },
    link: function(scope, element, attr) {
      element.on('mousedown', function(event) {
      	ConfirmActionService.open(scope.msg, scope.action);
      });
    }
  };
});