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
    
    $scope.moreComments = function() {
        if($scope.comments.next_page_url) {
            Event.comments({ 
                id: $scope.event.id, 
                page: $scope.comments.current_page + 1 
            }, function(data) {
                var comments = $scope.comments.data;
                var newComments = data;
                newComments.data = comments.concat(newComments.data);
                $scope.comments = newComments;
                $scope.comments.hasMore = data.current_page !== data.last_page;
            });
        }
    };

});