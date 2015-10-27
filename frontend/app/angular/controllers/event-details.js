'use strict';

angular.module('angularApp').controller('EventDetailsCtrl', function($scope, Event, event, comments) {

    $scope.newComment = function() {
        $scope.comment = {
            comment: '',
            user_id: $scope.authUser.id,
            event_id: $scope.event.id
        };
    };

    event.$promise.then($scope.newComment);
    
    $scope.event = event;
    
    $scope.comments = comments;
    
    $scope.sendComment = function() {
        Event.comment($scope.comment, function(data) {
            $scope.comments = data;
            $scope.newComment();
        });
    };

});