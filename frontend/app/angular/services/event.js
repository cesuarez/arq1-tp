'use strict';

angular.module('angularApp').factory('Event', function($resource) {
  return $resource('/events/:id', {id:'@id'}, {
    byUser: {
      url: '/events/byUser/:userId',
    },
    mostRecent: {
      url: '/events?privacy=public',
    },
    comments: {
      url: '/events/comments/:id',
    },
    comment: {
      method: 'POST',
      url: '/events/comment'
    }
  });
});