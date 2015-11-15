'use strict';

angular.module('angularApp').factory('Event', function($resource) {
  return $resource('/events/:id', {id:'@id'}, {
    owner: {
      url: '/events/owner/:id'
    },
    comments: {
      url: '/events/comments/:id',
    },
    comment: {
      method: 'POST',
      url: '/events/comment'
    },
    changeAssistance: {
      method: 'POST',
      url: '/events/assist/:id',
      isArray: true
    }
  });
});