'use strict';

angular.module('elmApp').factory('Event', ['$resource', function($resource){
  return $resource('/events/:id', {id:'@id'}, {
  });
}]);