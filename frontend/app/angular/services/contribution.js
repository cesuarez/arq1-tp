'use strict';

angular.module('angularApp').factory('Contribution', function($resource) {
  return $resource('events/:eventId/supplies/:supplyId/contributions', {id:'@id'});
});