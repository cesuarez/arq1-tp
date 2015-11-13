'use strict';

angular.module('angularApp').factory('Event', function($resource) {
  return $resource('/events/:id', {id:'@id'}, {
    comments: {
      url: '/events/comments/:id',
    },
    comment: {
      method: 'POST',
      url: '/events/comment'
    }
  });
});