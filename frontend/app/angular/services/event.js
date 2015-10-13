'use strict';

angular.module('angularApp').factory('Event', function($resource) {
  return $resource('/events/:id', {id:'@id'}, {
    
  });
});