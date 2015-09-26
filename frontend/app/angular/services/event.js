'use strict';

angular.module('elmApp').factory('Event', function($resource) {
  return $resource('/events/:id', {id:'@id'}, {
    get: {
      isArray: true
    }
  });
});