'use strict';

angular.module('angularApp').controller('CommentsCtrl', function($scope, $stateParams, Event) {
    
    $scope.newComment = function() {
        $scope.comment = {
            comment: '',
            user_id: $scope.authUser.id,
            event_id: $stateParams.id
        };
    };

    if($scope.authUser) {
        $scope.newComment();
    }

    $scope.comments = Event.comments({ id: $stateParams.id });
    
    $scope.sendComment = function() {
        $scope.sendDisabled = true;
        Event.comment($scope.comment, function(data) {
            $scope.comments = data;
            $scope.newComment();
            $scope.sendDisabled = false;
        }, function(){
            $scope.sendDisabled = false;
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
            });
        }
    };
    
});