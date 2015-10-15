'use strict';

angular.module('angularApp').factory('Event', function($resource) {
  return $resource('/events/:id', {id:'@id'}, {
    mostRecent: {
      url: '/events/mostRecent',
      isArray: true
    },
    count: {
      url: '/events/count'
    }
  });
});