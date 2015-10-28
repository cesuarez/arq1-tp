'use strict';

angular.module('angularApp').factory('User', function($resource) {
  return $resource('/users/:id', { id:'@id' });
});