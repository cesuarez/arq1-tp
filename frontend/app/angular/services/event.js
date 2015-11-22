'use strict';

angular.module('angularApp').factory('Event', function($resource) {
  return $resource('/events/:id', {id:'@id'}, {
    comments: {
      url: '/events/comments/:id',
    },
    comment: {
      method: 'POST',
      url: '/events/comment'
    },
    changeAssistance: {
      method: 'POST',
      url: '/events/assist/:id'
    },
    uninvitedUsers: {
      method: 'GET',
      url: '/events/:id/uninvited-users/:name',
      isArray: true
    },
    invite: {
      method: 'POST',
      url: '/events/invite/:id'
    }
  });
});