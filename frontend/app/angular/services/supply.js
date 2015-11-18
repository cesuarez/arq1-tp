'use strict';

angular.module('angularApp').factory('Supply', function($resource) {
  return $resource('events/:eventId/supplies/:id', {id:'@id'});
});